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
 * 12. global error 핸들링 해주기
 * - app 파일 루트에 global-error.tsx 파일 생성 (https://nextjs.org/docs/app/building-your-application/routing/error-handling)
 * 13. API Routes
 * - pages/api => app/api/route.ts
 * - ex) export async function GET(request: Request) {}
 * - 참고 (https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
 */

/**
 * Vercel 주요 기능
 * - 웹 애플리케이션 호스팅: 정적 파일로 구성된 웹 애플리케이션 배포 & 호스팅
 * - 빠른 배포: Git 저장소와 연동하여 변경사항이 발생하면 자동으로 배포
 * - CI/CD 통합: GitHub Actions, GitLab CI 등과 연동하여 지속적 통합 & 배포 설정
 * - 환경 변수 관리: 환경 변수 설정 지원 & 애플리케이션의 보안과 환경 설정 관리
 * - 도메인 관리: 사용자의 도메인을 Vercel 플랫폼에 연결할 수 있도록 도와줌
 * - 서버리스 함수: Serverless Functions를 제공하여 손쉽게 백엔드 기능 구축 가능
 * - 애널리틱스: 애플리케이션 성능 및 사용통계 수집 & 모니터링 도구 제공
 *
 *
 *
 *
 *
 *
 *
 * Vercel로 배포하기
 * - Vercel CLI로 배포:
 * 1) 프로젝트 디렉토리에서 Vercel CLI를 사용해서 수동 배포
 * 2) 명령어: Vercel
 * - Github/GitLab 연동 배포(Github import)
 * 1) Github/GitLab과 Vercel를 연동하여 저장소에 변경사항이 푸시될 때 마다 자동으로 배포
 * - 환경 변수 설정: Vercel 대시보드나 CLI를 통해 환경변수 설정
 *
 *
 *
 *
 *
 *
 * Vercel의 Github Import (CI/CD란?)
 * - Vercel의 Github Import는 CI/CD (Continuous Integration 지속적인 통합/ Continuous Deployment 지속적인 배포) 프로세스의 일부
 * - Continuous Integration (CI): 개발자나 팀이 코드 변경을 일일이 검사하지 않고도 코드의 품질과 안정 성을 유지하도록 도와주는 프로세스
 * 1)코드 변경이 이루어질 때마다 자동으로 테스트, 빌드 및 코드 검사를 수행하고, 오류를 미리 감지
 * - Continuous Deployment (CD): CD는 CI의 확장으로, 코드 변경이 CI 테스트를 통과하면 자동으로 프 로덕션 환경에 배포되도록 하는 프로세스
 * 1) 이를 통해 새로운 기능과 버그 수정 사항이 빠르게 사용자에게 제공
 */

/**
 * Vercel로 배포하기 (Github Import)
 * - Github를 연동하여 배포하는 방식으로 진행: Github Import는 Vercel에서 Github 리포지토리를 가져와 프로젝트를 배포하는 간단한 방법
 *
 * 1. Vercel 계정 생성
 * 2. 프로젝트 생성: 대시보드에서 "New Project"나 "Import Project"버튼을 클릭하여 새 프로젝트 생성
 * 3. Github Import: "Import Git Repository"를 선택하고 GitHub 계정에 로그인. 원하는 레포 import
 * 4. 배포 구성: Vercel은 프로젝트를 자동으로 감지하고 배포 구성을 설정함 (빌드 및 환경변수 추가 설정)
 * 5. 배포: 프로젝트를 배포하려면 "Deploy" 버튼을 클릭.(이후에는 설정한 브랜치에 푸시하면 자동 배포)
 *
 *
 *
 *
 *
 *
 *
 * 배포 후 수정사항:
 * - Vercel에 환경변수 추가
 * - Vercel에 Build Command 수정 - npx prisma generate && next build
 * Build & Development Setting 설정에서 => Build Command에 npx prisma generate && next build 작성하고 => override 토글해서 켜줌
 * - 카카오 디벨로퍼에서 배포된 URL 추가: https://developers.kakao.com/
 * - 네이버 디벨로퍼에서 배포된 URL 추가: https://developers.naver.com/
 * - 구글 API에서 배포된 URL 추가: https://console.cloud.google.com/apis/credentials
 */

/**
 * 도메인이란?
 * - 도메인 (Domain): 도메인은 웹 사이트나 웹 애플리케이션을 식볋하기 위한 주소
 * 1) 문자열로 표현되며, 실제로는 컴퓨터나 서버의 IP 주소와 연결
 * 2) Ex) search.naver.com는 도메인 주소/ naver.com 도메인 이름 / search 서브도메인
 * - 서브 도메인 (Subdomain): 도메인의 하위 레벨 주소. 웹 사이트의 특정 섹션이나 서비스를 식별하는 데 사용
 * - DNS (Domain Name System): 도메인 이름을 IP 주소로 해석하거나, IP 주소를 도메인 이름으로 변환하는 역할 을 하는 분산 데이터베이스 시스템.
 * DNS를 사용해서 도메인 이름을 실제 서버 IP 주소로 매핑
 *
 * https://search.naver.com/serach.naver?query=google
 *
 * https - 프로토콜
 * search - 서브도메인
 * naver.com - 루트도메인
 * search.naver - 경로 및 파일명
 * query=google - 쿼리스트링
 *
 *
 *
 *
 *
 * 도메인이란?
 * - 네임 서버 (Name Server): DNS 정보를 저장하고 관리하는 서버
 * 1) 도메인 이름을 IP 주소로 해석할 때, Name Server가 필요한 정보를 제공
 * - CNAME 레코드 (Canonical Name): CNAME 레코드는 도메인 이름을 다른 도메인 이름으로 매핑할 때 사용됨
 * 1) 이를 통해 한 도메인을 다른 도메인으로 리디렉션
 * - A 레코드 (Address): A 레코드는 도메인 이름을 IP 주소로 매핑할 때 사용됨
 * 1) Ex) "example.com"을 실제 웹 서버의 IP 주소로 연결할 때 A 레코드를 사용
 * - 즉, 도메인은 웹에서 중요한 주소로, 서브도메인과 함께 웹 사이트를 식별하는 데 사용 됨
 *
 *
 *
 *
 *
 *
 *
 * 도메인 계층 구조(domain1 사진)
 * - (1단계) 최상위 도메인 (Top-Level Domain): 도메인 이름의 가장 높은 수준 ex) .com, .org, .net
 * - 2단계 도메인 (Second-Level Domain): 1단계 도메인 하위에 위치하며, 특정 조직/회사/브랜드/서비스를 식별하는데 사용 ex) example.com에서 "example"
 * - 3단계 도메인 (=Subdomain): 더 구체적인 주소 또는 서브 사이트 (ex) blog.example.com 에서 "blog")
 *
 *
 *
 *
 *
 * 도메인을 사용하는 이유?
 * - 기억 및 접근 용이성: 도메인은 사람이 쉽게 기억하고 사용할 수 있는 문자열로 웹 리소스를 식별하는 데 도 움이 됨.
 * (Ex."www.example.com "은 93.184.216.34"라는 Ip 주소보다 기억하기 쉬움)
 * - 유연성: 도메인은 IP 주소와 다르게 리소스의 물리적인 위치나 변경 여부와 상관없이 유지될 수 있음
 * - 다중 호스팅: 하나의 도메인 이름 아래에 여러 웹 리소스 (웹 페이지, 이미지, 동영상 등)를 호스팅할 수 있음
 * 1) IP 주소만 사용할 경우, 각 리소스마다 다른 IP 주소를 기억하고 사용해야 하므로 복잡성이 증가
 * - 브랜드 식별: 브랜드의 이름 또는 식별 요소를 도메인에 포함시키면 사용자가 해당 브랜드와 연결되기 쉬움
 * - SEO: 의미 있는 도메인 이름을 선택하고, 키워드를 포함하는 도메인을 사용하면 검색 엔진에서 높은 순위 를 얻을 수 있음
 */
