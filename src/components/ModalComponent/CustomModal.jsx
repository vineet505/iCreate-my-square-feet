import React from "react";
import { Modal } from "antd";

const CustomModal = ({ children, open, setOpen }) => {
  return (
    <Modal
      title="Privacy and Policy"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1250}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
