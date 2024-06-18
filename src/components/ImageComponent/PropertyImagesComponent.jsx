"use client";
import { message, Upload } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import {
  AddSinglePropertyImageUrl,
  DeletePropertyImageViaIndexUrl,
} from "@/static/ApiEndpoints";
import { DeletePropertyImageViaIndexRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import { SERVER_SUCCESS } from "@/static/Static";

export const PropertyImagesComponent = ({ property_id, images }) => {
  const { data: session, status } = useSession();
  const userToken = session?.jwt;
  const [fileList, setFileList] = useState([]);
  const [isCancel, setIsCancel] = useState(false);

  const onChange = (info) => {
    if (isCancel) return;
    const { status } = info.file;
    setFileList(info.fileList);
    if (status === "done") {
      message.success(`Property Image Updated Successfully.`);
      window.location.reload();
    } else if (status === "error") {
      message.error(`File upload failed.`);
    } else if (status === "removed") {
      let imageIndex = info.file.uid.split("-")[1];
      setTimeout(async () => {
        let response = await DeletePropertyImageViaIndexRequest(
          DeletePropertyImageViaIndexUrl,
          imageIndex,
          property_id,
          userToken
        );
        if (response.type === SERVER_SUCCESS) {
          message.info(`File removed.`);
          window.location.reload();
        } else {
          message.error(`File remove failed.`);
        }
      }, 1);
    }
  };
  const props = {
    name: "file",
    action: `${AddSinglePropertyImageUrl}?property_id=${property_id}`,
  };

  props.customRequest = ({ file, onSuccess, onError }) => {
    if (isCancel) return;
    const formData = new FormData();
    formData.append("image", file);

    fetch(`${AddSinglePropertyImageUrl}?property_id=${property_id}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        onSuccess(result, file);
      })
      .catch((error) => {
        console.error("Error:", error);
        onError(error);
      });
  };

  useEffect(() => {
    setFileList(images);
  }, [images]);

  return (
    <div className="drop-shadow-2xl">
      <ImgCrop
        rotationSlider
        onModalCancel={() => setIsCancel(true)}
        onModalOk={() => setIsCancel(false)}
      >
        <Upload
          className="image-uploader"
          listType="picture-card"
          {...props}
          fileList={fileList}
          onChange={onChange}
        >
          {fileList.length < 10 && (
            <span className="dark:text-white">+ Upload</span>
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};
