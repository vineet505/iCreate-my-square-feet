import React from "react";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import ToasterProvider from "@/components/Toaster/ToasterProvider";


const BaseLayout = ({ children }) => {
  return (
    <>
      <AuthSessionProvider>
        <ThemeProvider>
          <ToasterProvider>{children}</ToasterProvider>
        </ThemeProvider>
      </AuthSessionProvider>
    </>
  );
};

export default BaseLayout;
