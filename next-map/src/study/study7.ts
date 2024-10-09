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

/**
 * app router 구조 설명
 *
 * 용어 정리 (next1 사진)
 * - 트리(Tree): 계층 구조를 시각화하는 방법
 * - 서브트리(Subtree): 트리의 일부로, 새로운 루트에서 시작하여 마지막 잎까지 이어짐
 * - 루트(Root): 트리나 서브트리의 첫 번째 노드
 * - 잎(Leaf): 자식이 없는 서브트리의 노드
 * - URL 세그멘트(Segment): 슬래시로 구분된 URL 경로의 일부
 * - URL 경로(Path): 도메인 다음에 오는 URL의 일부
 *
 *
 *
 *
 *
 *
 * Next.js 13 App Router (next2 사진)
 * - 앱 라우터: 새로운 app 디렉토리에서 작동하며, 기존 pages 디렉토리와 병렬로 작동하여 점진적인 적용을 가능하게 함
 * - app 디렉토리 안에 page.js 파일을 만들어서 공개적으로 접근 가능한 URL 경로를 만들 수 있음
 * - 기본적으로 app 디렉토리 내부의 컴포넌트는 리액트 서버 컴포넌트로 동작 (성능 최적화)
 *
 *
 *
 *
 *
 * 폴더 vs 파일
 * - Next.js는 파일 시스템 기반의 라우터를 사용함
 * - 폴더(Folder): 라우트를 정의하는데 사용
 * 1) 루트 폴더에서 시작하여 page.js 파일을 포함하는 마지막 잎 폴더까지 파일 시스템의 계층 구조를 따름
 * - 파일(Files): 라우트 세그먼트에 대해 표시될 UI를 생성하는데 사용
 * 1) 특히, Page.js 라는 파일을 사용해야 접근 가능한 URL 생성됨
 *
 *
 *
 *
 * 라우트 세그먼트
 * - 폴더: 라우트의 각 폴더는 라우트 세그먼트를 나타냄
 * - 각 라우트 세그먼트는 URL 경로의 해당 세그먼트에 매핑
 *
 *
 *
 *
 *
 * 파일 규칙 (파일명/설명)
 * - layout: 세그먼트와 그 자식들에 대한 공유하는 UI, 레이아웃 파일
 * - page: 라우트의 고유한 UI(페이지)를 만들고 공개적으로 접근 가능하게 만드는 ㅎ파일
 * - loading: 세그먼트와 그 자식들에 대한 로딩 UI
 * - not-found: 세그먼트와 그 자식들에 대한 404 UI
 * - error/global-error: 세그먼트와 그 자식들에 대한 에러UI, 글로벌 에러UI
 * - route: 서버 측 API 엔드포인트(기존 pages의 api 폴더 역할)
 * - template: 커스텀 된 (리렌더링) 레이아웃 UI
 *
 *
 *
 *
 *
 * Colocation(next3 사진)
 * - 꼭 라우팅 되는 페이지가 아니어도, app 디렉토리 안에 커스텀 파일 (ex. 컴포넌트, 스타일, 테스트 등)을 배치할 수 있음
 * - .폴더가 라우팅을 정의하지만, page.js 또는 route.js에서 반환된 내용만이 공개적으로 접근 가능
 * 1) 우측 예시에서 page.js를 제외한 파일들은 외부에서 URL 접근 불가. 대신 컴포넌트, API등의 역할을 함
 *
 *
 *
 *
 *
 *
 * 라우팅 정의 방법
 * - app router는 파일 시스템에 의해서 라우팅
 * 1) 각각의 폴더가 라우트 세그멘트가 되어, URL 세그멘트로 매핑
 * 2) 중복된 경로를 만들기 위해서는 원하는 경로 이름으로 폴더를 중복 생성
 * - 단, 폴더를 만든 후에, page.js 파일을 생성해야 공개적으로 접근 가능한 라우트 세그멘트가 됨
 * - ex) 우측 예시에서 /dashboard/analytics URL는 공개적으로 접근 가능하지 않음. 대신 컴포넌트, 이미지, 스타일 시트 등 담을 수 있음
 *
 *
 *
 *
 *
 * 페이지와 레이아웃
 * - Page.js: Route의 유일하게 UI를 보여줄 수 있는 페이지
 * 1) 기본적으로 서버 컴포넌트로 구성되며, 따로 클라이언트 컴포넌트 설정 가능 (Data Fetching 가능)
 * - Layouts: 여러 pages 간에 공유되는 UI
 * 1) 상태 보존, 인터렉티브 유지, 리렌더링 X
 * 2) 모든 페이지에 공유되는 Root Layout는 필수 생성
 * - layout.js와 page.js 파일은 같은 폴더에 정의 가능하며, layout.js는 항상 page.js를 감싸는 구조
 *
 *
 *
 *
 *
 * 레이아웃: Root Layout과 Template (next4 사진!!!!!!!!)
 * - Root Layout(필수): app 디렉토리 루트에 필수로 루트 레이아웃을 정의해야함
 * 1) 반드시 html, body 태그가 있어야 함
 * - 중첩 레이아웃: 기본적으로 레이아웃은 중첩됨
 * 1) children props를 통해 하위의 경로 감쌈
 * - Templates: 템플릿은 레이아웃과 비슷하게 layout, page를 감싸지만, 상태유지 X (새로운 인스턴스 생성)
 * 1) 특별한 상황이 아닌 경우, layout 사용 권장
 *
 *
 *
 *
 *
 *
 * 라우트 그룹 (Route Groups)
 * - 폴더를 Route 그룹으로 표시하여 해당 폴더가 경로의 URL 경로에 포함되지 않도록 할 수 있음
 * - 왜? Route Group을 통해 URL 경로 구조에 영향을 주지않고, 라우트 세그먼트와 프로젝트 파일을 논리적으로 구성
 * - 컨벤션: 폴더 이름을 괄호로 묶음으로써 생성 (name)
 * 1) 각각의 Route Group 마다 같은 URL 계층을 가져도, 다른 layout을 적용
 * - (marketing), (shop)은 app 하단의 최상위 루트지만, Route Group을 이용해서 별개의 레이아웃 구성
 */

/**
 * app router로 마이그레이션 하기
 *
 * 참고)
 * Data Fetching에서 fetch API로 업그레이드 할 때, http://localhost:3000가 아닌 http:// 127.0.0.1:3000 으로 서버 실행 & 빌드 해줘야 함
 * 1) Localhost:3000로 사용하면 로컬에서 Same-Origin Policy 때문에 빌드 에러가 날 수 있음
 * 2) 따라서 카카오 개발자 센터, 네이버 개발자 센터, 구글 클라우드 콘솔에서 callback URL를 127.0.0.1:3000 으로 변경하고 진행
 * - 이번 강의에서는 Next.js API Route를 'stores'와 'nextauth' 부분만 변경할 계획
 * 1) 기존 Pages/api와도 잘 실행이 되는지 확인하기
 *
 *
 *
 *
 *
 * 순서 (https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
 * 1. yarn add next@latest 로 최신버전 설치
 * 2. app 디렉토리 만들고 RootLayout 생성
 * - 기존 _app.tsx 코드 가져오기 (provider.tsx 만들어서 코드 구분해주고 layout.tsx에서 import해옴)
 * 3. metadata 임포트해서 사용하기
 * ex)
 * import { Metadata } from 'next'
 *
 * export const metadata: Metadata = {
 *  title: 'My Page Title',
 * }
 *
 * export default function Page() {
 *  return '...'
 * }
 * 4. _app.tsx, _document.tsx 삭제
 * 5. env => http://localhost:3000 => http://127.0.0.1:3000
 * 6. page => index.tsx 를 app => page.tsx로 페이지 라우팅 변경
 * 7. getServerSideProps를 fetch api를 사용해서 cache: no-store로 사용 및 변경
 * 8. useRouter는 next/router => next/navigation 으로 변경
 * 9. kakao developer에서 callback url 변경해야함 (https://developers.kakao.com/console/app/1135563/config/platform)
 * - 플랫폼 => http://localhost:3000 삭제 말고 하나 더 추가 + http://127.0.0.1:3000
 * - 카카오 로그인에서 Redirect URI에서도 http://127.0.0.1:3000/api/auth/callback/kakao 추가
 * 10. 네이버 개발자센터 (https://developers.naver.com/main/)
 * - 내 애플리케이션 => NextMap 에서 네이버 로그인 callback url 에도 http://127.0.0.1:3000/api/auth/callback/naver 추가
 * 11. google cloud console (https://console.cloud.google.com/welcome?project=next-map-436710)
 * - OAuth 2.0 클라이언트 ID 에서 승인된 JavaScript 원본에 http://127.0.0.1:3000 추가, 승인된 리디렉션 URI에 http://127.0.0.1:3000/api/auth/callback/google 추가
 */
