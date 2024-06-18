"use client"
import React from 'react'
import PageHeader from '../Headers/PageHeader'
import TermsTable from '../Settings/TermsTable'
import { useState, useEffect } from 'react';
import { GetTermsorPolicy } from "@/lib/Settings/SettingsHandler";
import { GetTermsOrPrivacyHtmlUrl } from "@/static/ApiEndpoints";
import { SERVER_SUCCESS } from "@/static/Static";
import { useSession } from 'next-auth/react';
import CustomModal from '../ModalComponent/CustomModal';
import ContentEditor from './ContentEditor';


const TermsComponent = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [html_text, setHtmlText] = useState("");

  const trigger_model = () => {
    setOpen(old => !old);
  }


  useEffect(() => {
    setTimeout(async () => {
      const url  = GetTermsOrPrivacyHtmlUrl + "?source_type=terms" ;
      const response = await GetTermsorPolicy(url);
      if (response.type == SERVER_SUCCESS) {
        setHtmlText(response.data.html_text);
      }
    }, 1000);
  }, [status, open]);


  return (
    <div className='mx-2'>
    <PageHeader title={"Terms and Conditions"} />
    <CustomModal open={open} setOpen={setOpen}>
        <ContentEditor editor_id="terms_editor" html_text={html_text} trigger_model={trigger_model} type={"terms"} />
      </CustomModal>
    <TermsTable trigger_model={trigger_model} />
    </div>
  )
}

export default TermsComponent