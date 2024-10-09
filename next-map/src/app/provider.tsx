"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

interface NextProps {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: NextProps) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          <ToastContainer
            autoClose={1000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
          {/* autoclose - 1초만에 닫히게 하기, pauseonfocuseloss, pauseonhover - 포커스 하거나 호버 하면 멈추는데 안멈추게 하기 */}
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export const NextLayout = ({ children }: NextProps) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};
