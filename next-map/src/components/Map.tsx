/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from "next/script";
import { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
}

const DEFAULT_LAT = 37.497625203; // 위도
const DEFAULT_LNG = 127.03088379; // 경도

export default function Map({ setMap }: MapProps) {
  const loadKakaoMap = () => {
    // kakao map 로드 함수
    window.kakao.maps.load(() => {
      // React에서는 우리가 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 밑에 붙게 되어 있음
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
