"use client";

import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import StoreList from "@/components/StoreList";
import { LikeApiResponse, LikeInterface } from "@/interface";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useQuery } from "react-query";

function LikesContent({ page }: { page: string }) {
  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data as LikeApiResponse;
  };

  const {
    data: likes,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(`likes-${page}`, fetchLikes, { suspense: true });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        Error...
      </div>
    );
  }

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100 mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          likes?.data.map((like: LikeInterface, i) => (
            <StoreList store={like.store} i={i} key={i} />
          ))
        )}
        {isSuccess && !!!likes?.data.length && (
          <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
            찜한 가게가 없습니다.
          </div>
        )}
      </ul>
      <Pagination
        totalPage={likes?.totalPage}
        page={page}
        pathname="/users/likes"
      />
    </>
  );
}

export default function LikesPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <h3 className="text-lg font-semibold">찜한 맛집</h3>
      <div className="mt-1 text-gray-500 text-sm">찜한 가게 리스트입니다.</div>
      <Suspense fallback={<div>Loading...</div>}>
        <LikesContent page={page} />
      </Suspense>
    </div>
  );
}
