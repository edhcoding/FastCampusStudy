/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkersProps {
  map: any;
  storeDatas: any[];
  setCurrrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  storeDatas,
  setCurrrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      // 식당 데이터 마커 생성하기
      storeDatas?.map((store) => {
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

        // 마커 커서가 오버되었을 때 마커 위에 표시할 인포 윈도우 생성
        const content = `<div class="infowindow">${store?.upso_nm}</div>`; // 인포 윈도우에 표시할 내용 (마커에 마우스 이벤트 등록하기)

        const customOverlay = new window.kakao.maps.CustomOverlay({
          // (커스텀 오버레이 생성하기1)
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다 ((마커에 마우스 이벤트 등록하기))
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
          customOverlay.setMap(null);
        });

        // 선택한 가계 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrrentStore(store);
        });
      });
    }
  }, [map, setCurrrentStore, storeDatas]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
