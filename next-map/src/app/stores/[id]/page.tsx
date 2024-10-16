"use client";

import Comments from "@/components/comments";
import Like from "@/components/Like";
import Loader from "@/components/Loader";
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import { StoreDataType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface StoreDetailPageProps {
  params: { id: string };
}

export default function StoreDetailPage({ params }: StoreDetailPageProps) {
  const router = useRouter();
  const id = params.id;

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreDataType;
  };

  const {
    data: store,
    isSuccess,
    isFetching,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    enabled: !!id, // enabled가 false 이면 react query를 멈출 수 있음, id 값이 없으면 데이터를 못가져오도록 함
    refetchOnWindowFocus: false, // 기본값 true인데 다른창 넘어갔다 다시 원래 창으로 돌아올때마다 새로고침 되는 현상 막아줌
  });

  const handleDelete = async () => {
    const confirm = window.confirm("해당 가게를 삭제하시겠습니까?");

    if (confirm && store) {
      try {
        const result = await axios.delete(`/api/stores?id=${store?.id}`);

        if (result.status === 200) {
          toast.success("가게를 삭제했습니다.");
          router.replace("/");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        console.log(e);
        toast.error("다시 시도해주세요.");
      }
    }
  };

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        Error...
      </div>
    );
  }

  if (isFetching) {
    return <Loader className="mt-[20%]" />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="md:flex justify-between items-center py-4 md:py-0">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {store?.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {store?.address}
            </p>
          </div>
          {status === "authenticated" && store && (
            <div className="flex items-center gap-4 px-4 py-3">
              <Like storeId={store.id} />
              <Link
                href={`/stores/${store?.id}/edit`}
                className="underline hover:text-gray-400 text-sm"
              >
                수정
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="underline hover:text-gray-400 text-sm"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                카테고리
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.category}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                위도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lat}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                경도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lng}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                연락처
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                식품인증구분
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.foodCertifyName}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                업종명
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.storeType}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <>
          <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
            <Map lat={store?.lat} lng={store?.lng} zoom={1} />
            <Marker store={store} />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Comments storeId={store.id} searchParamsPage={page} />
          </Suspense>
        </>
      )}
    </>
  );
}
