"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { UploadTermsOrPrivacyHtmlUrl } from "@/static/ApiEndpoints";
import { UploadTermsorPolicy } from "@/lib/Settings/SettingsHandler";
const TinyScriptSrc = "assets/libs/tinymce/tinymce.min.js";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useSession } from "next-auth/react";
const initialOptions = {
  height: 500,
  menubar: true,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "preview",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | " +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

const ContentEditor = ({ editor_id, html_text, trigger_model, type }) => {
  const { data: session, status } = useSession();
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      setTimeout(async () => {
        const url = UploadTermsOrPrivacyHtmlUrl + "?source_type=" + type;
        const response = await UploadTermsorPolicy(
          url,
          editorRef.current.getContent(),
          session.jwt
        );
        toastHandler(response.data.message)
      }, 10);
      trigger_model();
    }
  };

  return (
    <>
      <Editor
        id={editor_id}
        tinymceScriptSrc={TinyScriptSrc}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={html_text}
        init={initialOptions}
      />
      <div className="flex justify-end">
        <button
          className="rounded-md p-2 bg-black text-white px-4 mt-2"
          onClick={log}
        >
          Update{" "}
        </button>
      </div>
    </>
  );
};

export default ContentEditor;
