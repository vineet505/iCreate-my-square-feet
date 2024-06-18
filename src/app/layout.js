import "./globals.css";
import BaseLayout from "@/layouts/baselayout";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Admin Panel",
  description: "Nextjs Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning={true}>
      <body className="bg-lightBg dark:bg-black">
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
