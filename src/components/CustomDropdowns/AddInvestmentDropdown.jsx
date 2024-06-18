import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";

export default function AddInvestmentDropdown({ children }) {
  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu aria-label="Add Investments">
        <DropdownItem key="residential" textValue="residential">
          <Link href="/investment/residential">
            <p>Residential</p>
          </Link>
        </DropdownItem>
        <DropdownItem key="commercial" textValue="commercial">
          <Link href="/investment/commercial">
            <p>Commercial</p>
          </Link>
        </DropdownItem>
        <DropdownItem key="farms" textValue="farms" >
          <Link href="/investment/farms">
            <p>Farms</p>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
