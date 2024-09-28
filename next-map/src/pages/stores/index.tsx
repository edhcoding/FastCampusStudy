/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import { StoreDataType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";

export default function StoreListPage() {
  const [q, setQ] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  const searchParams = {
    q,
    district,
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting; // 페이지 하단에 왔는지 안왔는지 확인하기 위해서

  // const {
  //   data: stores,
  //   isLoading,
  //   isError,
  // } = useQuery(`stores-${page}`, async () => {
  //   const { data } = await axios(`/api/stores?page=${page}`);
  //   return data as StoreApiResponse;
  // });

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores", {
      params: {
        page: pageParam,
        limit: 10,
        q,
        district,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    getNextPageParam: (lastpage: any) =>
      lastpage.data?.length > 0 ? lastpage.page + 1 : undefined,
    // getNextPageParam. getPreviousPageParam: 다음 및 이전 페이지에 대한 매개 변수를 생성하는 함수
    // getNextPageParam와 getPreviousPageParam 옵션으로 로드할 데이터가 더 있는지 여부와 fetch할 정보를 결정할 수 있습니다. 해당 정보는 query 함수에 추가 매개 변수로 제공됩니다.
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, hasNextPage, isPageEnd]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        Error...
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      {/* search filter */}
      <SearchFilter setQ={setQ} setDistrict={setDistrict} />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((store: StoreDataType, i: number) => (
                <li key={i} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4 ">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store.category}.png`
                          : "/images/markers/default.png"
                      }
                      alt="아이콘 이미지"
                      width={48}
                      height={48}
                    />
                    <div>
                      <div className="text-sm font-semibold leading-6 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                      {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
                      {store?.category}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {/* {stores?.totalPage && (
        <Pagination totalPage={stores?.totalPage} page={page} />
      )} */}
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
