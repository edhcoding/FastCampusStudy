import "@/styles/globals.css";
import { NextLayout, NextProvider } from "./provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextMap",
  description: "Next.js App Router를 이용한 맛집 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
