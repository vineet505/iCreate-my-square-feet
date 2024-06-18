import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import {
  GetListofPropertyToRecommendUrl,
  SetFeaturedPropertiesUrl,
  SetRecommendedPropertiesUrl,
  SetTopRatedPropertiesUrl,
} from "@/static/ApiEndpoints";
import { useState, useEffect } from "react";
import {
  GetListofPropertyToRecommend,
  SetRecommendedProperties,
} from "@/lib/Recommendation/RecommendationHandler";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useSession } from "next-auth/react";

const RecommendPropertyModalComponent = ({
  type,
  currentRegion,
  isOpen,
  onOpenChange,
  handleRefresh,
}) => {
  const [propertyList, setPropertyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (currentRegion === "") return;
    setTimeout(async () => {
      const response = await GetListofPropertyToRecommend(
        GetListofPropertyToRecommendUrl,
        type,
        currentRegion
      );
      setPropertyList(response.data.properties);
    }, 1);
  }, [currentRegion, type]);

  const handleSelectionChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleAddProperty = () => {
    setIsLoading(true);
    setTimeout(async () => {
      let api_url =
        type === "featured"
          ? SetFeaturedPropertiesUrl
          : type === "recommended"
          ? SetRecommendedPropertiesUrl
          : SetTopRatedPropertiesUrl;
      const response = await SetRecommendedProperties(
        api_url,
        selectedProperty,
        currentRegion,
        session.jwt
      );
      toastHandler(response.data.message);
      handleRefresh();
      setIsLoading(false);
      onOpenChange(false);
    }, 1);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize">
                Add {type} Property
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Select an Property"
                  className="w-full"
                  onChange={handleSelectionChange}
                  size="sm"
                  placeholder="Select an Property"
                  items={propertyList}
                >
                  {(property) => (
                    <SelectItem key={property.id}>
                      {property.select_lablel}
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onPress={handleAddProperty}
                >
                  Add Property
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecommendPropertyModalComponent;
