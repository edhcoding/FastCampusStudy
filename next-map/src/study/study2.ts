/**
 * 카카오 맵으로 지도 구현
 * next/script란?
 *
 * Next.js Script 컴포넌트란?
 * - 서버 및 클라이언트 모두에서 JavaScript 코드를 실행하고 데이터를 초기화하는 데 사용되는 컴포넌트(SSR, CSR 모두 적용가능함)
 * - 서버에서 데이터를 미리 가져와 클라이언트로 전달하거나, 클라이언트 측에서 라우팅 또는 페이지 진입시 특정 작업을 수행할 수 있음
 * - 서버 사이드 데이터 로딩: 페이지가 서버에서 처음 렌더링 될 대 데이터 초기화하는데 사용
 * - 클라이언트 사이드 데이터 로딩: 페이지가 클라이언트에서 로딩될 때 특정 작업 수행하도록 설정
 *
 *
 *
 * Next.js Script 컴포넌트 주요 속성
 * - 아래와 같이 여러 속성을 줄 수 있음. 특히, script의 url를 로드할 때 사용하는 src 속성만 필수값임
 * 속성명(prop) - 설명 및 예시
 * src - 로드할 스크립트 파일 경로 지정 ex) src = "http://example.com/script"
 * strategy - 스크립트의 로드 전략 설정 (언제 로드/실행 하는지) ex) strategy = "lazyOnload"
 * onLoad - 스크립트가 로드되면 실행할 함수 지정 ex) onLoad = {onLoadFunc}
 * onReady - 스크립트가 준비되면 실행할 함수 지정 ex) onReady = {onReadyFunc}
 * onError - 스크립트 로드 중에 오류가 발생할 때 실행할 함수 지정 ex) onError = {onErrorFunc}
 * 
 * 
 * 
 * 
 * Next.js Script:strategy 속성
 * - 스크립트의 로드 전략을 설정할 수 있는 옵션. 스크립트가 언제 로드되고 실행할 지 지정
 * - 네가지 옵션이 있음:
 * 1) afterInteractive(기본값): 스크립트가 페이지 상호 작용 가능한 후에 로드 되고 실행
 * 2) beforeInteractive: 스크립트가 페이지의 상호 작용 가능한 상태 이전에 로드되고 실행 (hydration 이전)
 * 3) lazyOnLoad: 스크립트가 페이지가 완전히 로드된 후에 로드되고 실행 (브라우저 idle 타임에)
 * 4) worker(experimental): Service Worker와 같은 백그라운드 워커 스크립트를 로드하고 실행하는데 사용
 * 
 * 
 * 
 * 
 * Next.js Script: onReady 속성과 onLoad 속성
 * onLoad: 스크립트 파일이 브라우저에 성공적으로 로드될 때 호출
 * - 스크립트 파일에 추가적인 초기화 작업이 필요한 경우, onLoad를 사용해서 수행가능
 * - beforeInteractive과는 사용 불가함. (onReady 사용 권장)
 * 
 * onReady: 스크립트 파일이 브라우저에 로드되고 스크립트 내 모든 작업이 완료되었으며, 페이지가 상호 작용 가능한 상태가 될 때 호출
 * - 스크립트가 완전히 초기화 되고, 페이지의 모든 요소 초기화 + 상호 작용 작업 완료된 후 호출
 * 
 * ex)
 * <Script
      id="google-maps"
      src= "https://maps.googleapis.com/maps/api/js"
      onReady={() => {
        new google.maps.Map(mapRef. current, {
          center: { lat: -34.397, 1ng: 150.644 }, 
          zoom: 8,
        });
      }}
    />







카카오 맵으로 지도 구현
kakao developers 세팅
1. 카카오 디벨로퍼 사이트 접속 후 앱 생성: https://developers.kakao.com/
2. 애플리케이션 생성 후, "앱 키" 섹션의 JavaScript 키 복사
1. 환경 변수에 "NEXT_PUBLIC_KAKAO_MAP_CLIENT”로 해당 키 저장
3. 플랫폼 > Web에 로컬 호스트 추가 (http://localhost:3000)
4. 카카오 지도 API 사이트에서 > Web 선택: https://apis.map.kakao.com/web/
• 관련 도큐를 확인하며 카카오 지도 불러오기





Kakao Map API로 지도 불러오기
카카오 지도 API 가이드: https://apis.map.kakao.com/web/guide/
1. 지도 담을 영역 만들기 (<div id="map"></div>)  id가 map으로 시작하는 영역 만들어줘야함
2. Javascript API로 지도 불러오기
3. Next/Script를 사용해 스크립트 동적 로드를 위해서 카카오 맵의 load 메서드 사용하기 (https://apis.map.kakao.com/web/documentation/#load)
4. Kakao 객체 정의가 안되었다는 eslint 에러 해결을 위해 상단에 /*global kakao*/ /*입력해줄거임                     
5. 지도 스크립트의 로딩 및 초기화를 페이지의 상호 작용 가능한 상태와 동기화하고, 페이지 성능을 최적화하기 위해 Next/Script의 afterlnteractive strategy와 onReady 사용
 */

/**
 * kakao map api 지도 불러오기 (코드 예시)
 * 
 * 상단에 카카오 객체 정의
/*global kakao*/
/*

import Layout from '@/components/Layout';
import Script from 'next/script';

window 객체에 kakao 프로퍼티 추가 선언 (TS)
declare global {
  interface Window {
    kakao: any;
  }
}

카카오 지도 로드 함수 (지도 옵션 설정)
export default function Home() {
  const loadKakaoMap = () => {
    window.kakao.maps. load(() => {
      const mapContainer = document.getElementById( 'map' ) ;
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), 
        level: 3,
      }；
      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  }；

  return (
    ‹Layout>
      <Script
        strategy="afterInteractive" 
        type="text/javascript" 
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false'}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </Layout>
  );
}
 */

/**
 * Next.js Image 컴포넌트란?
 * - Next.js에서는 이미지를 효율적이게 처리하고 최적화 하기 위한 Image 컴포넌트를 제공
 * - 이미지를 최적화하여 페이지 로딩 속도를 개선하고, 사용자 경험을 향상시킬 수 있음
 * - 사용 방법은 우측 코드와 같이 next/image에서 모듈을 가져올 수 있음
 *
 *
 *
 *
 *
 * Next/Image 컴포넌트 16가지 속성
 * src: 표시할 이미지 파일 경로 또는 URL ex) src="/profile.png"
 * alt: 이미지 대체 텍스트 제공 ex)alt="~~"
 * width, height: 이미지 크기 지정
 * loader: 이미지 로딩 방식을 지정하는 함수 ex)loader={imageLoader}
 * fill: 반응형 이미지의 크기를 조절 ex)fill={true}
 * sizes: 반응형 이미지의 크기를 조절 ex) sizes="(max-width: 768px) 100vw"
 * quality: 이미지 품질을 설정 (1~100까지의 정수) ex) quality={80}
 * priority: 이미지 로딩 우선순위 설정 ex) priority={true}
 * placeholder: 이미지 로딩 중에 표시할 미리보기 이미지 설정 ex) placeholder="blur"
 * styles: 커스텀 css 스타일을 지정하여 이미지에 스타일링 적용 ex) style={{objectFit:"contain"}}
 * onLoadingComplete: 이미지 로딩이 완료된 후 호출되는 콜백 함수 설정 ex)onLoadingComplete={img=>done()}
 * onLoad: 이미지 로딩이 시작될 때 호출되는 콜백 함수 설정 ex) onLoad={event=>done()}
 * onError: 이미지 로딩 중 오류 발생 시 호출되는 콜백 함수 설정 ex) onError(event=>fail())
 * loading: 이미지 로딩 전략 설정 (eager/lazy) ex)loading="lazy"
 * blurDataURL: 이미지 로딩 중 미리보기 이미지로 사용할 데이터 URI 설정 ex) blurDataURL="data:image/jpeg.."
 * 
 * 
 * 
 * 
 * Next/Image 컴포넌트 특징
 * - 이미지 최적화: 이미지를 자동으로 최적화 하고, 필요한 크기로 조정함
 * - 이미지 포맷: WebP, JPEG, PNG등 다양한 이미지 포맷 지원  (브라우저의 지원 여부에 따라 최상의 포맷 자동 선택)
 * - 반응형 이미지: next/image를 사용하면 반응형 이미지 쉽게 생성 가능. 다양한 크기의 이미지를 제공하며 브라우저 창 크기에 따라 적절한 크기 이미지 자동 선택
< Image
src="/path/to/image. jpg"
alt="이미지 설명"
width={500}
he ight={300}
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50 vw"
>
- 레이아웃 속성: next/image의 layout 속성을 사용해서 이미지의 레이아웃 제어 가능 (layout="fixed")
  • intrinsic: (기본값) 이미지의 원본 크기를 유지하면서 조정
  • fixed: 지정된 너비와 높이로 이미지가 고정
  • responsive: 반응형 이미지로, 가로 비율을 유지하면서 너비만 지정
- 미리보기 이미지: 이미지 로딩 전에, 미리보기 이미지를 생성하여 페이지 레이아웃이 변경되지 않고 사용 자 경험을 향상
- Lazy loading: next/image 모듈은 레이지 로딩을 자동으로 지원. 화면에 나타날 때 이미지를 로드
  • 따라서, 페이지 초기 로딩 성능을 향상시키고 대역폭을 절약
- 효율적인 캐싱: 이미지를 효율적으로 캐싱하여 이미지 로딩을 최적화
- 테마 감지: 테마 (다크 모드 or 라이트 모드)에 따라 이미지를 동적으로 선택할 수 있음
- 애니메이션 이미지: GIF와 같은 애니메이션 이미지를 지원함
  • 기본적으로 이미지를 자동으로 최적화하고, 로딩할 때 애니메이션 유지
 */

/**
 * 카카오 맵 기본 마커 구현
 * 카카오 지도 마커 가이드: https://apis.map.kakao.com/web/documentation/#Marker
 * 
 * 공공데이터 다운로드
 * 공공 데이터: https://data.seoul.go.kr/dataList/OA-2741/S/1/datasetView.do
 * 위 주소에서 데이터 JSON 형식으로 다운로드 (혹은 강의 게시판에서 지도_데이터.json 파일 다운로드)
 * 프로젝트에 /src/data/store_data.josn 파일로 저장
 */
