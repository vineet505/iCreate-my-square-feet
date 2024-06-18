import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const RegionSelectComponent = ({ regionList, setCurrentRegion,currentRegion }) => {

  const handleSelectionChange = (e) => {
    if(!e.target.value) return;
    setCurrentRegion(e.target.value);
  };

  if (regionList.length === 0) {
    return <></>;
  }
  return (
    <Select
      selectionMode="single"
      disallowEmptySelection={true}
      label="Select an Region"
      className="w-full"
      onChange={handleSelectionChange}
      size="sm"
      placeholder="Select an Region"
      items={regionList}
      defaultSelectedKeys={[currentRegion]}
    >
      {(region) => <SelectItem key={region.value}>{region.label}</SelectItem>}
    </Select>
  );
};

export default RegionSelectComponent;
