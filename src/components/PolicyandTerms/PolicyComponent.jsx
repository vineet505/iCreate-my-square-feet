"use client";
import ContentEditor from "./ContentEditor";
import PageHeader from "../Headers/PageHeader";
import { useState, useEffect } from "react";
import PolicyTable from "../Settings/PolicyTable";
import { useSession } from "next-auth/react";
import { GetTermsorPolicy } from "@/lib/Settings/SettingsHandler";
import { GetTermsOrPrivacyHtmlUrl } from "@/static/ApiEndpoints";
import { SERVER_SUCCESS } from "@/static/Static";
import CustomModal from "../ModalComponent/CustomModal";

const PolicyComponent = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [html_text, setHtmlText] = useState("");

  const trigger_model = () => {
    setOpen((old) => !old);
  };

  useEffect(() => {
    setTimeout(async () => {
      const url = GetTermsOrPrivacyHtmlUrl + "?source_type=policy";
      const response = await GetTermsorPolicy(url);
      if (response.type == SERVER_SUCCESS) {
        setHtmlText(response.data.html_text);
      }
    }, 10);
  }, [status]);

  return (
    <div className=" mx-2">
      <PageHeader title={"Privacy and Policy"} />
      <CustomModal open={open} setOpen={setOpen}>
        <ContentEditor
          editor_id="policy_editor"
          html_text={html_text}
          trigger_model={trigger_model}
          type={"policy"}
        />
      </CustomModal>
      <PolicyTable trigger_model={trigger_model} />
    </div>
  );
};

export default PolicyComponent;
