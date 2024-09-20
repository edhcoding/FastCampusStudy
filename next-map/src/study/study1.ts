/**
 * 사용하는 기술 소개
 *
 * Next.js 개녕 & 장점
 * - Next.js: 서버사이드 렌더링(SSR)를 제공하는 React 프레임워크
 * - 라우팅 시스템을 내장하고 있으며 SEO에도 우수함
 * - SSR 뿐만 아니라, 정적 사이트 생성(SSG)를 지원하여 사전에 페이지를 미리 렌더링 & 캐싱 가능
 * - 성능 최적화: SSR및 SSG를 사용하여 초기 로딩속도 개선, 성능 최적화
 * - SEO 최적화: SSR로 검색엔진 최적화 용이, 페이지 제목, 메타 태그 설정 용이
 * - 확장성: 기존 리액트 앱을 쉽게 마이그레이션 가능, 다양한 데이터 fetching 및 라이브러리 통합
 * - 거대한 커뮤니티: 큰 커뮤니티와 다양한 플러그인 및 라이브러리 지원
 * - 보안: CSRF 및 XSS 공격 보호하는 내장된 보안 기능
 *
 *
 *
 * Next.js 기능
 * - 서버사이드 렌더링 (SSR): 페이지를 서버에서 생성하고 클라이언트에 전송하여 초기 로딩 속도를 개선. SEO에도 유리함
 * - 정적 사이트 생성 (SSG): 빌드 시점에 페이지를 미리 렌더링하여 빠른 초기 로딩을 가능하게 함
 * - 편리한 라우팅: 내장된 라우팅 시스템을 사용하여 페이지 간 이동을 쉽게 관리할 수 있음
 * - API Routes: 서버 로직을 쉽게 작성하고 API를 생성할 수 있는 기능을 제공
 * - 코드 분할: 페이지 및 컴포넌트를 자동으로 코드 청크로 분할하여 로딩 성능을 최적화
 * - 그 외: 미들웨어, 앱 라우터, 레이아웃, 서버 컴포넌트 등 여러 기능 내장
 *
 *
 *
 * Next.js
 * 장점
 * - SSR 및 SSG 지원: Next.js는 SSR과 SSG를 쉽게 구현할 수 있어 초기 로딩 속도와 검색 엔진 최적화 (SEO)를 개선할 수 있음
 * - SEO 최적화: SSR로 검색 엔진은 페이지를 쉽게 색인화할 수 있으며, 메타태그 및 제목 태그 관리 용이
 * - 개발 생산성 향상: 간단한 프로젝트 구조와 라우팅 설정, 자동 코드 분할 등의 기능으로 개발 생산성 향상
 * - 리액트와 호환성: React 기반으로 작동하며, React 컴포넌트와 라이브러리를 쉽게 통합할 수 있음
 *
 * 단점
 * - 학습 곡선:.Next.js는 초기에는 복잡할 수 있고, 기존의 React 개발자에게는 새로운 개념을 익혀야 함
 * - 서버 자원 소모: SSR은 매 요청마다 서버에서 페이지를 렌더링하므로 서버 자원을 많이 소모할 수 있음
 * - 그 외: 느린 네트워크 영향, 복잡한 애플리케이션 구현 시 복잡도 커짐, 서버 부하 등
 *
 *
 *
 *
 * 서버 사이드 렌더링 (SSR): 서버에서 페이지를 미리 생성한 뒤, 사용자에게 페이지를 렌더링을 하는 방식
 * - 사용자가 페이지에 접속할 때 서버에서 미리 HTML을 생성하고 클라이언트로 보냄
 * - 사용자에게 초기 내용을 빠르게 표시하고 검색 엔진 최적화(SEO)를 개선하는 데 도움을 줌
 * 진행 방식?
 * 1. 사용자가 새로운 사이트 요청
 * 2. 서버에서 미리 생성된 HTML 파일 제공(화면 O, 상호작용 X)
 * 3. 브라우저가 JS 파일 다운로드 (화면 O, 상호작용 X)
 * 4. 브라우저가 JS 실행 (화면 O, 상호작용 O)
 *
 *
 *
 * create-next-app
 * 설치 방법 npx create-next-app@latest or yarn create next-app
 *
 *
 *
 *
 * getStaticProps: 정적 페이지 생성을 위한 데이터 가져오기 함수. 런타임이 아닌, 빌드(build) 타임에서만 실행이 되므로, 변동이 거의 없는 데이터 대상으로만 적용하는게 좋음
 * ex) 거의 변동이 없는 FAQ 글 목록을 가져올 때 사용됨
 * return props해줌 (props는 데이터 가져오기 함수)
 *
 * getStaticPaths: 동적 경로를 위한 정적 경로 생성 함수. 동적으로 생성되는 페이지를 사전 렌더링 할 때 사용
 * ex) 하나의 FAQ 데이터(id:1)가 존재한다고 했을 때, faqs/1 라는 경로를 빌드 타임에 미리 사전 렌더링 할 수 있음
 * return paths, fallback해줌 (paths는 동적 경로 생성 함수, fallback은 없는 경로 404 페이지로 처리하기 boolean)
 *
 * getServerSideProps: 서버 사이드 렌더링을 위한 데이터 가져오기 함수. 매 요청마다 데이터를 서버에서 가져옴
 * ex)자주 업데이트 되는 posts 데이터들을 외부 API로부터 fetch 해서 사전 렌더링 하고 싶을 때 사용
 * return data (data는 서버에서 데이터 가져온거임)
 *
 *
 *
 *
 * Next.js에서 Tailwind 사용하기
 * 1. yarn으로 tailwind css 설치 후, tailwind css 구성파일 설치를 위해 tailwind css init 커맨드 입력
 * 1) yarn add -D tailwindcss postcss autoprefixer
 * 2) npx tailwindcss init -p
 *
 * 2. PostCSS 설정파일에 tailwindcss 추가
 * ex)postcss.config.js
 * module.export = {
 *  plugins: {
 *    tailwindcss: {},
 *    autoprefixer: {},
 *  }
 * }
 *
 *
 *
 * Tailwind 개녕 & 장점
 * - Tailwind CSS: 스타일링을 더욱 편하게 도와주는 CSS 프레임워크
 * - 클래스 이름을 사용하여 스타일을 적용하는 방식 (ex. bg-blue-500, mx-4, font-bold)
 * - 프로젝트에 맞게 커스터마이징이 가능하며, 특정 디자인 시스템을 구축하는 데 활용할 수 있음
 *
 * - 개발 생산성 향상: 클래스 기반 스타일링은 HTML 코드에 직접 스타일을 작성하는 것보다 간결하고 빠르게 디자인을 적용할 수 있음
 * - 일관된 디자인: Tailwind CSS를 사용하면 프로젝트 전반에 걸쳐 일관된 디자인을 적용
 * - 커스터마이징 용이: 프로젝트에 맞게 커스터마이징할 수 있으므로, 특정 디자인 시스템을 구축하는 데 유용
 * - 풍부한 생태계: 풍부한 문서와 학습 리소스가 있어, 빠르게 스킬을 습득 가능 & 활발한 커뮤니티
 *
 *
 *
 *
 * Tailwind 기능
 * - 클래스 기반 스타일링: Tailwind CSS의 가장 중요한 특징은 클래스 이름을 사용하여 스타일을 정의하고 적용하는 것. 사전에 정의된 스타일 세트에 따라 스타일을 적용
 * - 유연한 그리드 시스템: 그리드 시스템을 쉽게 설정하고 다양한 레이아웃을 구축할 수 있음
 * - 반응형 레이아웃: sm, md, lg xl과 같은 반응형 클래스를 사용하여 다양한 화면 크기에 대응하는 레이아 웃을 생성할 수 있음
 * - 플러그인 및 확장성: Tailwind CSS는 플러그인 시스템을 제공하여 기본 스타일 외에도 다양한 확장 스타 일을 추가할 수 있음
 * - 그 외에도, 커스텀 스타일을 추가하거나, 다크모드, 스타일 재사용 등 여러가지 편리한 기능 제공
 *
 *
 *
 *
 * Next-auth 개녕 & 기능
 * - Next Auth: Next.js 기반의 앱에서 사용자 인증 작업을 쉽게 처리할 수 있는 라이브러리
 * - 사용자 로그인, 회원가입 및 다양한 인증 제공자(ex: Google, Facebook, Github)와의 통합을 간편하게 구현할 수 있음
 *
 * - 인증: 사용자 로그인 및 회원가입을 지원하며, 다양한 인증 제공자로 사용자를 인증
 * - 세션 관리: 사용자 세션을 쉽게 관리하고, 로그인 상태를 유지할 수 있음
 * - 인증 제공자 통합: 다양한 인증 제공자와의 통합을 지원하여 사용자가 원하는 방식으로 로그인
 * - JWT 토큰: JSoN Web Token(JWT)을 사용하여 사용자 인증 정보를 안전하게 저장하고 전달
 * - 세션 저장소: 사용자 세션 데이터를 저장하기 위한 다양한 백엔드 데이터베이스를 지원
 *
 *
 *
 *
 * Next-auth 장점
 * - 빠른구현
 * - 다양한 인증 제공자
 * - 보안
 * - 세션 관리 용이성
 * - Next.js와의 통합
 *
 *
 *
 *
 *
 * React-Query 개념 & 기능
 * - React Query: React 앱에서 데이터를 관리하고 비동기 작업을 처리하기 위한 강력한 라이브러리
 * - 데이터 관리: 서버에서 데이터를 가져와 컴포넌트에서 사용할 수 있게 함
 * - 비동기 작업: 비동기 작업을 수행하고, 데이터를 로딩하고, 캐시하며, 에러 처리를 단순화
 *
 * - 데이터 캐싱: 불필요한 데이터 요청을 피하기 위해 자동으로 데이터를 캐싱
 * - 상태 관리: 컴포넌트에서 데이터 로딩 상태, 에러 상태 및 데이터를 관리하고 업데이트할 수 있음
 * - 비동기 데이터 가져오기: useQuery 훅을 사용하여 서버에서 데이터를 비동기적으로 가져올 수 있음
 * - 뮤테이션: useMutation 훅을 사용하여 데이터 업데이트, 생성 및 삭제를 처리할 수 있음
 * - 상태 유지: 컴포넌트 간에 데이터를 공유하고 동기화할 수 있으며, 페이지 간에 데이터를 유지할 수 있음
 *
 *
 *
 * React-Query 장점
 * - 데이터 관리 용이성
 * - 성능 향상
 * - 개발 생산성
 * - 서버 상태 관리
 * - 테스트 용이성
 *
 *
 *
 *
 * React-hook-form 개념 & 기능
 * - React-hook-form: 리액트 애플리케이션에서 폼 처리를 더욱 간편하게 만들어주는 라이브러리
 * - 폼 관리: React Hook Form은 폼 요소의 상태와 유효성 검사를 관리하기 위한 라이브러리로, 필요한 상 태를 간단한 훅으로 제공, 간편한 상태관리
 * - 훅 기반: Hook API를 사용하여 컴포넌트 내에서 폼 상태를 관리 (ex. useForm, useFieldArray, useWatch)
 * - 커스텀 및 다양한 입력 요소 지원: 모든 종류의 입력 요소 (텍스트, 라디오 버튼, 체크박스, 셀렉트 박스 등)와 커스텀 입력 요소를 지원
 * - 유효성 검사: 내장된 유효성 검사 규칙 또는 사용자 정의 검사 함수를 사용하여 입력값을 유효성 검사
 * - 폼 제출 처리:.handleSubmit 함수를 사용하여 폼 제출을 처리하고, 필요한 로직을 실행할 수 있음
 * - 리액트 렌더링 최적화
 *
 *
 *
 *
 * Next.js API Routes
 * - Next.js API Routes: Next.js 애플리케이션 내에서 서버리스 백엔드 역할을 수행하는 기능
 * - 서버리스 백엔드: 서버를 구축하지 않고도 서버리스 백엔드 기능을 제공
 * - API 엔드포인트: API Routes를 사용하여 서버에 엔드포인트를 생성하고, 클라이언트에서 데이터를 요 청하거나 전달할 수 있음 (/pages/api 디렉터리에 파일 생성 후 API 함수 작업)
 * - HTTP 요청 처리: HTTP GET, POST, PUT, DELETE 등의 요청을 처리하고 응답을 생성
 * - 파라미터 처리: 동적 라우팅을 통해 URL 파라미터를 추출하고 사용
 * - 미들웨어 사용: 요청과 응답에 대한 미들웨어 함수를 적용하여 요청 전처리 및 인증을 처리
 * - 클라이언트 호출: 클라이언트에서 API Routes에 HTTP 요청을 보내 데이터를 요청하고 업데이트
 *
 *
 *
 *
 *
 * Prisma
 * - 데이터베이스 쿼리 및 ORM(object-relational-mapping) 작업을 단순화하고 개발 생산성을 높이는 데 도움을 주는 ORM 프레임워크
 *    - 데이터 모델링, ORM 기능, 타입 안전성, 데이터베이스 마이그레이션, 쿼리 생성 등 지원
 *    - 장점: 개발 생산성 향상, 타입 안전성, 다양한 데이터베이스 지원
 *
 *
 * Supabase
 * - 오픈소스 서버리스 백엔드 플랫폼으로, 데이터베이스, 인증, 스토리지 등을 통합적으로 제공
 *    - 데이터베이스, 사용자 인증, 스토리지, 실시간 웹소켓 등의 기능 제공
 *    - 장점: 빠른 개발, 실시간 데이터, 확장성, 오픈소스
 */

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
