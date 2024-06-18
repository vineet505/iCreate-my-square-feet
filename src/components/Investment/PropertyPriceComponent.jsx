import React from "react";
import ViewAllButton from "../Buttons/ViewAllButton";
import { CandleListComp } from "../DataView/ListComponent";
import { useDisclosure } from "@nextui-org/react";
import GraphEditModalComponent from "../CustomModals/GraphEditModalComponent";
import GraphAddModalComponent from "../CustomModals/GraphAddModalComponent";
import { getDateFromTimestamp } from "@/utility/utils";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SetPropertyCandlesRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import { SetPropertyCandlesUrl } from "@/static/ApiEndpoints";

const PropertyPriceComponent = ({
  candles,
  property_id,
  handleRefresh,
  refreshPage,
}) => {
  const [candle, setCandle] = useState([]);
  const [selected, setSelected] = useState(null);
  const { data: session, status } = useSession();
  // For Edit
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  // For Add Modal
  const {
    isOpen: isOpenAdd,
    onOpen: OnOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  const existingDates = candles.map((candle) => {
    return getDateFromTimestamp(candle.time);
  });

  useEffect(() => {
    setCandle(
      candles.map((candle) => {
        return {
          time: getDateFromTimestamp(candle.time),
          price: candle.price,
          id: candle.id.split("-")[1],
        };
      })
    );
  }, [candles, refreshPage]);

  const handleGraphDelete = (id) => {
    let new_candles = candles
      .filter((candle, index) => {
        return index !== parseInt(id);
      })
      .map((candle) => {
        return {
          timestamp: candle.time,
          price: candle.price,
        };
      })
      .sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

    let request_body = {
      property_id: property_id,
      candle_data: new_candles,
    };

    setTimeout(async () => {
      SetPropertyCandlesRequest(
        SetPropertyCandlesUrl,
        request_body,
        session?.jwt
      )
        .then((response) => {
          handleRefresh();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1);
  };

  return (
    <div className="bg-white dark:bg-[#15171C]   rounded-md">
      <div className="flex items-center justify-between px-4 h-[50px] border-b-1 border-b-gray-200 dark:border-b-gray-900">
        <span className="font-light ml-2 text-[12px] uppercase">
          Recent Prices
        </span>
        <div className="cursor-pointer" onClick={OnOpenAdd}>
          <ViewAllButton text="Add Price" />
        </div>
      </div>
      <div className="h-[400px] overflow-auto  px-4">
        {candle.map((item, index) => {
          return (
            <CandleListComp
              key={index}
              time={item.time}
              price={item.price}
              id={item.id}
              onOpenEdit={onOpenEdit}
              handleGraphDelete={handleGraphDelete}
              setSelected={setSelected}
            />
          );
        })}
      </div>
      <GraphEditModalComponent
        isOpen={isOpenEdit}
        onOpenChange={onOpenChangeEdit}
        existingDates={existingDates}
        old_candle_data={candles}
        selected={selected}
        handleRefresh={handleRefresh}
        property_id={property_id}
      />
      <GraphAddModalComponent
        existingDates={existingDates}
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        property_id={property_id}
        old_candle_data={candles}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};

export default PropertyPriceComponent;
