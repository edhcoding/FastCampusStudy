/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from "next/script";
import * as stores from "@/data/store_data.json";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203; // 위도
const DEFAULT_LNG = 127.03088379; // 경도

export default function Map() {
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

      // 식당 데이터 마커 생성하기
      stores?.["DATA"]?.map((store) => {
        const imageSrc = store?.bizcnd_code_nm // (마커 이미지 생성)
            ? `/images/markers/${store?.bizcnd_code_nm}.png`
            : "/images/markers/default.png", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다 (마커 이미지 생성)
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커가 표시될 위치입니다 (마커 생성) (마커 이미지 생성)
        const markerPosition = new window.kakao.maps.LatLng(
          store?.y_dnts, // 지도 y좌표 값
          store?.x_cnts // 지도 x좌표 값
        );

        // 마커를 생성합니다 (마커 생성)
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정 => !!!!!!!!!! store_data에서 카테고리에서 ex)인도/중동 이런식으로 슬래쉬로 되어있으면 인식을 못하므로 우리가 _ 언더바나 이런걸로 바꿔줘야함
        });

        // 마커가 지도 위에 표시되도록 설정합니다 (마커 생성)
        marker.setMap(map);
      });
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
