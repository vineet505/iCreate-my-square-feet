import React from "react";
import { message } from "antd";
import { UploadPropertyDocuments } from "@/static/ApiEndpoints";
import { useState } from "react";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "@nextui-org/react";

const UploadFileButton = ({ type, name, propertyid, session, text, url, handleRefresh }) => {
  const [file, setFile] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const handleUpload = (type) => {
    if (file == null) {
      message.error("Please select file");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    const callUrl =
      UploadPropertyDocuments +
      "?property_id=" +
      propertyid +
      "&" +
      "type=" +
      type +
      "&" +
      "document_title=" +
      file.name;

    formData.append("document", file);

    setTimeout(() => {
      fetch(callUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.jwt}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.type == "success") {
            message.success(`${name} Added`);
          } else {
            message.error(`Failed to Upload ${name}`);
          }
        })
        .catch((error) => {
          message.error(`${name} upload failed`);
        });

      setIsLoading(false);
      setFile(null);

      setTimeout(() => {
        handleRefresh()
      }, 1000);

    }, 1000);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }} // Hide the default file input
        id={type}
        onChange={handleFileChange}
      />
      <label
        htmlFor={type}
        style={{
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
          padding: "10px 20px",
          margin: "10px",
          borderRadius: "5px",
        }}
      >
        <UploadOutlined /> {name}
      </label>

      <Button onClick={() => handleUpload(type)} isLoading={isloading}>
        Submit
      </Button>
      {text ? (
        <EyeOutlined
          className="cursor-pointer mx-2"
          onClick={() => window.open(url)}
        />
      ) : (
        ""
      )}
      <div className="py-2">{file ? `Selected File:  ${file.name}` : ""}</div>
    </div>
  );
};

export default UploadFileButton;
