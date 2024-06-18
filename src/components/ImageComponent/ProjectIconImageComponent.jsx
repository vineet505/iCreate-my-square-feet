"use client";
import { message, Upload, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { UploadPropertyLogoUrl } from "@/static/ApiEndpoints";
import { getBase64 } from "@/utility/utils";

export const ProjectIconImageComponent = ({ ImageUrl, property_id, imageId }) => {
  const { data: session, status } = useSession();
  const userToken = session?.jwt;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isCancel, setIsCancel] = useState(false);

  const onChange = (info) => {
    if (isCancel) return;
    setFileList(info.fileList);
    const { status } = info.file;
    if (status === "done") {
      message.success(`Project Icon Image Updated Successfully.`);
    } else if (status === "error") {
      message.error(`File upload failed.`);
    }
  };
  const props = {
    name: "file",
    action:  `${UploadPropertyLogoUrl}?property_id=${property_id}`,
  };

  props.customRequest = ({ file, onSuccess, onError }) => {
    if (isCancel) return;
    const formData = new FormData();
    formData.append("logo", file); 

    fetch(`${UploadPropertyLogoUrl}?property_id=${property_id}`, {
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
  const handleCancel = () => {
    setPreviewOpen(false);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  useEffect(() => {
    setFileList([
      {
        uid: imageId,
        name: "regionImage.png",
        status: "done",
        url: ImageUrl,
      },
    ]);
  }, [status, ImageUrl, imageId]);
  return (
    <div className="drop-shadow-2xl">
      <ImgCrop
        rotationSlider
        onModalCancel={() => setIsCancel(true)}
        onModalOk={() => setIsCancel(false)}
      >
        <Upload
          className="image-uploader"
          listType="picture-circle"
          {...props}
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
        >
          {fileList.length < 1 && (
            <span className="dark:text-white">+ Upload</span>
          )}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        closeIcon={
          <span className="text-white">
            <CloseOutlined />
          </span>
        }
      >
        <div className="h-[500px]">
          <Image
            fill={true}
            alt="example"
            src={previewImage}
          />
        </div>
      </Modal>
    </div>
  );
};
