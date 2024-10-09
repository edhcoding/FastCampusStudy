import { mapState } from "@/atom";
import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import PullPageLoader from "./FullPageLoader";

export default function CurrentLocationButton() {
  // 위치를 가져올때 2~3초 정도 걸리니까 lodaing usestate 생성
  const [loading, setLoading] = useState<boolean>(false);

  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setLoading(true);

    // geolocation으로 현재위치 가져오기
    const options = {
      enableHighAccuracy: false, // 정확도 높여주는 대신 느려짐 - 그래서 우린 여기서는 false
      timeout: 5000,
      maximumAge: Infinity, // Infinity하면 캐싱됨
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            toast.success("현재 위치로 이동되었습니다.");
          }

          return currentPosition;
        },
        () => {
          toast.error("현재 위치를 가져올 수 없습니다.");
          setLoading(false);
        },
        options
      );
    }
  };

  return (
    <>
      {loading && <PullPageLoader />}
      <button
        type="button"
        onClick={handleCurrentPosition}
        className="fixed z-10 p-2 shadow right-10 bottom-20 bg-white rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
      >
        <MdOutlineMyLocation className="size-5 " />
      </button>
    </>
  );
}
