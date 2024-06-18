"use client";
import React from "react";
import { useSession } from "next-auth/react";
import PageHeader from "@/components/Headers/PageHeader";
import FooterComponent from "@/components/Footer/FooterComponent";
import { useState, useEffect } from "react";
import { GetPropertyImagesUrl, GetPropertyDocuments } from "@/static/ApiEndpoints";
import { GetPropertyImagesRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { PropertyImagesComponent } from "@/components/ImageComponent/PropertyImagesComponent";
import dynamic from "next/dynamic";
import PropertyImagesCarousal from "@/components/CustomCarousal/PropertyImagesCarousal";
import PropertyPriceComponent from "@/components/Investment/PropertyPriceComponent";
import { GetPropertyCandlesRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import {
  GetPropertyCandlesUrl,
} from "@/static/ApiEndpoints";
import TradesbyPropertyTable from "@/components/Trades/TradesbyPropertyTableComponent";
import UploadFileButton from "@/components/Buttons/UploadFileButton";

const PropertyGraphChart = dynamic(
  () => import("@/components/CustomCharts/PropertyGraphChart"),
  { ssr: false }
);

const Page = ({ params }) => {
  const { propertyid } = params;
  const { data: session, status } = useSession();
  const [antImages, setAntImages] = useState([]);
  const [candles, setCandles] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [propertyDocs, setPropertyDocs] = useState({
    brochure_title: '',
    brochure_url: '',
    document_title: '',
    document_url: '',
  })

  const handleRefresh = () => {
    setRefreshPage(!refreshPage);
  };

  useEffect(() => {
    if (status === "loading") return;
    const fetchPropertyImages = async () => {
      const response = await GetPropertyImagesRequest(
        GetPropertyImagesUrl,
        propertyid,
        session?.jwt
      );
      let antdImages = response.data.images.map((image, index) => {
        return {
          uid: "customuid-" + index,
          name: "propertyImage.png",
          status: "done",
          url: image,
          original: image,
        };
      });
      setAntImages(antdImages);
    };
    fetchPropertyImages();
  }, [status, refreshPage, session, propertyid]);
  
  useEffect(() => {
    if (status === "loading") return;
    const fetchDocumentUrls = async () => {
      const response = await GetPropertyImagesRequest(
        GetPropertyDocuments,
        propertyid,
        session?.jwt
      );
      let property_docs = response.data
      setPropertyDocs({
        brochure_title: property_docs.brochure_title,
        brochure_url: property_docs.brochure_url,
        document_title: property_docs.document_title,
        document_url: property_docs.document_url,
      })
    };
    fetchDocumentUrls()
  }, [status, refreshPage, session, propertyid]);

  useEffect(() => {
    if (status === "loading") return;
    const fetchPropertyCandles = async () => {
      const response = await GetPropertyCandlesRequest(
        GetPropertyCandlesUrl,
        propertyid
      );
      let candles = response.data.candles[0].candle_data.map(
        (candle, index) => {
          return {
            time: candle.timestamp,
            price: candle.price,
            id: "customindex-" + index,
          };
        }
      );
      candles.sort((a, b) => new Date(a.time) - new Date(b.time));
      setCandles(candles);
    };
    fetchPropertyCandles();
  }, [status, refreshPage, session, propertyid]);



  if (status === "loading") return <LoadingSpinner />;

  return (
    <>
      <PageHeader title={"Add Property Price"} />

      <div className="flex flex-wrap justify-between gap-2 mt-2 mb-10">
        <div className="flex-auto w-full lg:w-[65%] dark:bg-[#15171C] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <PropertyGraphChart candles={candles} refresh={refreshPage} />
        </div>

        <div className=" flex-auto w-full lg:w-[30%] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <PropertyPriceComponent
            candles={candles}
            property_id={propertyid}
            handleRefresh={handleRefresh}
            refresh={refreshPage}
          />
        </div>
      </div>

      <PageHeader title={"Add Documents"} />
      <div className="flex flex-wrap  gap-4 mt-2 mb-10">
        {/*  */}
        <UploadFileButton handleRefresh={handleRefresh} type={'project_document'} name="Document" propertyid={propertyid} session={session} key={'project_document'} text={propertyDocs.document_title} url={propertyDocs.document_url} />
        <UploadFileButton handleRefresh={handleRefresh} type={'brochure'} name="Brochure" propertyid={propertyid} session={session} key={'brochure'} text={propertyDocs.brochure_title} url={propertyDocs.brochure_url} />
      </div>

      <PageHeader title={"Add Property Images"} />
      <div className="flex flex-wrap justify-between gap-2 mt-2 mb-10">
        <div className=" flex-auto w-full lg:w-[30%] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <div className=" flex ">
            {antImages.length > 0 && (
              <div className="p-4 w-[25%]">
                <PropertyImagesCarousal items={antImages} />
              </div>
            )}
            <div className="flex p-4 ">
              <PropertyImagesComponent
                property_id={propertyid}
                images={antImages}
              />
            </div>
          </div>
        </div>
      </div>

      <PageHeader title={"Trades History"} />
      <TradesbyPropertyTable propertyId={propertyid} />

      <FooterComponent />
    </>
  );
};

export default Page;
