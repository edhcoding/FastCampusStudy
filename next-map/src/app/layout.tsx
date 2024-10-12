import "@/styles/globals.css";
import { NextLayout, NextProvider } from "./provider";
import { Metadata } from "next";
import { Suspense } from "react";
import GoogleAnalytics from "./googleAnalytics";

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
        <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
        <NextProvider>
          <NextLayout>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
