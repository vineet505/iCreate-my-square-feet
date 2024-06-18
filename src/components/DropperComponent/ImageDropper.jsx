"use client";
import { message, Upload, Modal } from "antd";
import {CloseOutlined} from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { UploadAdminProfilePicture } from "@/static/ApiEndpoints";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import Image from "next/image";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const props = {
  name: "file",
  action: UploadAdminProfilePicture,
};

const ImageDropper = () => {
  const { data: session, status, update } = useSession();
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
      message.success(`Profile Picture Changed Successfully.`);
    } else if (status === "error") {
      message.error(`File upload failed.`);
    }
  };

  const updateProfilePictureUrlinSession = (url) => {
    update(
      {
        ...session,
        user: {
          ...session.user,
          user_details: {
            ...session.user.user_details,
            profile_picture_url_key: url,
          },
        },
      },
      false
    );
  };
  props.customRequest = ({ file, onSuccess, onError }) => {
    if (isCancel) return;
    const formData = new FormData();
    formData.append("profile_image", file);
    fetch(UploadAdminProfilePicture, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        updateProfilePictureUrlinSession(result.data.profile_picture_url);
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
        uid: session?.user?.user_details?.id,
        name: "image.png",
        status: "done",
        url: session?.user?.user_details?.profile_picture_url_key
      },
    ]);
  }, [
    status,
    session?.user?.user_details?.profile_picture_url_key,
    session?.user?.user_details?.id,
  ]);
  return (
    <div className="drop-shadow-2xl">
      <ImgCrop
        rotationSlider
        onModalCancel={() => setIsCancel(true)}
        onModalOk={() => setIsCancel(false)}
      >
        <Upload
          className="avatar-uploader"
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
        closeIcon={<span className="text-white"><CloseOutlined /></span>}
      >
        <div className="h-[500px]">
          <Image fill={true}  alt="example" onError={(e) => {
            e.target.id = "https://i.pravatar.cc/300";
            e.target.srcset = "https://i.pravatar.cc/300";
          }} src={previewImage} />
        </div>
      </Modal>
    </div>
  );
};

export default ImageDropper;
