/**
 * Next.js 13으로 마이그레이션
 *
 * Next.js 13 업데이트
 * - 2022년 10월 25일 Next.js Conf 에서 Next.js 13을 공식 발표
 * - app/Directory: 더 쉽고, 더 빠르고, 더 적은 client JS
 * Layouts
 * React Server Components
 * Streaming
 * - Turbopack: Rust 기반 Webpack 대체제로, 속도가 최대 700배 빨라짐
 * - New next/image: 네이티브 브라우저 lazy loading으로 더 빨라짐
 * - New @next/font: 레이아웃 이동이 없는 자동 자체 호스트 글꼴이 추가됨
 * - Improved next/link: 자동 <a> 태그로 API를 단순화
 * 
 * 
 * 
 * 
 * 
 * 
 * app/ Directory (Stable)
 * - 기존의 Pages 폴더 기반 파일 시스템 라우터를 'app' 디렉토리로 변경하며 라우팅 및 레이아웃 개선
 * - 라우팅 구조의 변경 외에도 Layout, Server Component, Streaming, Data Fetching 등을 업데이트
 * - Layout: 리렌더링 방지를 위한 레이아웃 제공
 * - Server Component: app 디렉토리 내 파일은 디폴트로 서버 컴포넌트로 동작
 * - Streaming: app 디렉토리는 렌더링되는 UI 단위를 점진적으로 렌더링 & 스트리밍할 수 있는 기능 제공
 * - Data Fetching 지원: fetch() Web API를 사용할 수 있게 되어, 컴포넌트 레벨에서도 SSR 적용 가능
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Layouts
 * - app/ 파일 구조에서는 기본 레이아웃을 정의할 수 있음 (필수)
 * - 복잡한 상태를 더 쉽게 관리할 수 있고, 리렌더링을 방지하면서 경로간 공통 UI를 쉽게 공유할 수 있음
 * - 또한, 레이아웃을 중첩하거나 라우트, 컴포넌트, 테스트 및 스타일과 함께 앱 코드를 배치할 수 있음
 * - 여러 페이지들이 동일한 UI를 공유할 때 레이아웃 기능 사용
 * Ex) 네비게이션에 레이아웃을 적용하면 상태를 유지하면서 상호작용을 하고 리렌더링을 방지
 * 
 * 
 * 
 * 
 * 
 * 
 * React Server Components
 * - app/ 디렉토리에서는 Server Components 아키텍쳐를 지원
 * 1) app/ 디렉토리 내부에서는 기본적으로 모든 컴포넌트가 서버 컴포넌트로 동작함
 * 2) 클라이언트 컴포넌트를 사용하려면, 파일 상단에 'use client'라는 directive 명시
 * - 서버 컴포넌트를 사용하면 클라이언트로 전송되는 JS 양을 줄여 초기 페이지 로드 속도를 줄일 수 있음
 * - 성능 최적화: 렌더링하는 데 필요한 데이터만 서버에서 가져오고, 이를 브라우저로 전달 (로딩 속도 개선)
 * - SSR 및 SEO: 서버에서 초기 페이지 렌더링을 수행하므로 검색 엔진 최적화(SEO)와 성능 향상
 * - 실시간 업데이트: 클라이언트 측 JS가 필요하지 않으므로, 실시간 업데이트와 같은 기능을 구현하기 쉬움
 * - 서버측 데이터 흐름 관리: 데이터 흐름을 더욱 효율적으로 관리
 * 
 * 
 * 
 * 
 * 
 * 
 * Streaming
 * - app/ 파일 구조는 렌더링된 단위 별 UI를 클라이언트에 점진적으로 렌더링하고 스트링밍할 수 있는 기능을제공
 * - loading.js 파일을 생성하면 React Suspense와 함께 로딩UI를 생성할 수 있음
 * 1) 페이지 내용을 로드하는 동안, 서버로부터 즉시 로딩 상태를 표시하고, 렌더링이 완료되면 컨텐츠 표시
 * - 또한, 렌더링된 단위 별 UI를 클라이언트에 점진적으로 렌더링하고 스트리밍할 수 있는 기능을 제공
 * 1) 페이지의 HTML을 더 작은 청크로 분할하고, 서버에서 점진적으로 클라이언트로 전송
 * 
 * 
 * 
 * 
 * 
 * Data Fetching (fetching 사진)
 * 1) cache 부분에 ex) force-cache 같이 넣으면 getStaticProps 가 되고
 * 2) no-store라고 하면 getServerSideProps가 됨
 * 3) next: { revaildate: 10 } 이라고 하면 10초마다 데이터가 업데이트됨
 * 
 * 
 * 
 * 
 * 
 * Turbopack (beta)
 * - Next.js 13에는 Webpack의 새로운 Rust 기반 후속 제품인 Turbopack이 포함됨
 * - Webpack 보다 700배 빠른 업데이트가 가능하며, Vite 보다 10배 빠른 업데이트
 * - Turbopack은 개발에 필요한 최소한의 asset만 번들링하므로 시작 시간이 매우 빠름
 * 
 * 
 * 
 * 
 * 
 * New next/image (stable)
 * - Next.js 13은 레이아웃 변경 없이 이미지를 쉽게 표시하고, on-demand 방식으로 파일을 최적화하여 성능을 향상시킬 수 있는 강력한 next/image 컴포넌트를 제공
 * - 클라이언트 측 JS가 더 적게 포함됨
 * - 스타일링 및 구성이 용이함
 * - 기본적으로 alt 태그를 내장하여 접근성을 향상
 * - 네이티브 lazy-loading을 사용하기 때문에 더 빠른 (hydration 필요하지 않음)
 * 
 * 
 * 
 * 
 * 
 * New @next/font
 * - Next.js 13에서는 레이아웃 이동이 필요 없는 자동 자체 호스팅 폰트 제공
 * 1) 커스텀 폰트를 포함하여 모든 폰트를 자동으로 최적화
 * 2) 개인 정보 보호 및 성능 향상을 위한 외부 네트워크 요청 제거
 * 3) 모든 폰트 파일에 대한 자동 self-hosting 내장
 * 4) CSS의 size-adjust 속성을 자동으로 적용
 * 
 * 
 * 
 * 
 * 
 * Improved next/link
 * - 업데이트된 next/link에서는 더 이상 수동으로 <a>를 하위 항목으로 추가할 필요가 없음
 * - Next.js 13 에서 <Link>는 항상 <a>를 렌더링하며 기본 태그로 props를 전달할 수 있음
 */
