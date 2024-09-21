/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";

interface StoreBoxProps {
  currentStore: any;
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({
  currentStore,
  setCurrentStore,
}: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-5 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {currentStore && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    currentStore?.bizcnd_code_nm
                      ? `/images/markers/${currentStore?.bizcnd_code_nm}.png`
                      : "/images/markers/default.png"
                  }
                  alt="아이콘 이미지"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold">{currentStore?.upso_nm}</div>
                  <div className="text-sm">{currentStore?.cob_code_nm}</div>
                </div>
              </div>
              <button type="button" onClick={() => setCurrentStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <HiOutlineMapPin />
              {currentStore?.rdn_code_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {currentStore?.tel_no}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {currentStore?.crtfc_gbn_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineCheck />
              {currentStore?.bizcnd_code_nm}
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.alert("상세보기 작업중")}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
