import "@/styles/globals.css";
import { NextLayout, NextProvider } from "./provider";
import { Metadata } from "next";
import { Suspense } from "react";

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
          <NextLayout>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
