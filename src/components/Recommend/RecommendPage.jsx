"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import FooterComponent from "../Footer/FooterComponent";
import RecommendationTable from "./RecommendationTable";
import {  GetRegionListUrl } from "@/static/ApiEndpoints";
import { useState, useEffect } from "react";
import { GetRegionListRequest } from "@/lib/Region/RegionRequestHandler";

export const RecommendPage = () => {
  const tableTypes = ["featured", "recommended", "top rated"]
  const [regionList, setRegionList] = useState([]);
  const [currentRecommendedRegion, setCurrentRecommendedRegion] = useState("");
  const [currentTopRatedRegion, setCurrentTopRatedRegion] = useState("");
  const [currentFeaturedRegion, setCurrentFeaturedRegion] = useState("");

  useEffect(() => {
    setTimeout(async () => {
      const response = await GetRegionListRequest(GetRegionListUrl);
      let options = response.data.region_list.map((region) => {
        return { value: region.id, label: region.title };
      });
      setRegionList(options);
      setCurrentRecommendedRegion(options[0].value);
      setCurrentTopRatedRegion(options[0].value);
      setCurrentFeaturedRegion(options[0].value);
    }, 1);
  }
  , []);

  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Customer Picks"}  />
          {
            tableTypes.map((type,index) => {
              return (
                <RecommendationTable
                key={"recommendation-table-"+index}
                  type={type}
                  regionList={regionList}
                  setCurrentRegion={
                    type === "featured"
                      ? setCurrentFeaturedRegion
                      : type === "recommended"
                      ? setCurrentRecommendedRegion
                      : setCurrentTopRatedRegion
                  }
                  currentRegion={
                    type === "featured"
                      ? currentFeaturedRegion
                      : type === "recommended"
                      ? currentRecommendedRegion
                      : currentTopRatedRegion
                  }
                />
              );
            })
          }
      <FooterComponent />
    </div>
  );
};

