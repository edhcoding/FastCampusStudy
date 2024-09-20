/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const loadKakaoMap = () => {
    // kakao map 로드 함수
    window.kakao.maps.load(() => {
      // React에서는 우리가 HTML의 script 태그에서 로드한 객체는 무조건 window 객체 밑에 붙게 되어 있음
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      new window.kakao.maps.Map(mapContainer, mapOptions);
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
