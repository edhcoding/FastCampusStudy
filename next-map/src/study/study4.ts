/**
 * Next.js API Routes란? (사진 api1)
 * - Next.js에서 자체적으로 제공하는 백엔드 기능. 서버 사이드 코드를 작성하지 않고도 서버리스 백엔드 엔드포인트를 만들 수 있게 해주는 기능
 * - pages/api 디렉토리 안에 파일을 생성하여 API 엔드포인트를 정의. 이를 통해 데이터를 조회, 생성, 수정, 삭제할 수 있는 서버리스 API를 구축
 *
 *
 *
 * Next.js API ROutes 핵심 기능
 * - 서버리스 백엔드 구축: 서버 코드 작성 없이도 백엔드 엔드포인트 생성 가능 (pages/api 디렉토리)
 * - 동적 라우팅: 파일 이름에 파라미터를 포함하여 동적인 엔드포인트를 생성할 수 있음
 * - HTTP 요청 메서드 처리: 다양한 HTTP 메서드 (GET, POST, PUT, DELETE 등)에 따른 로직 작성 가능
 * - 미들웨어 사용: req, res 매개변수를 활용하여 미들웨어 패턴을 적용할 수 있음
 * - 응답 도우미 함수: res.json(), res.send(), res.status(), res.setHeader()와 같은 응답 도우미 함수를 사용하여 응답을 구성
 * - 간단한 백엔드 로직 작성: Next,js API Routes를 활용하면 데이터 조회, 생성, 수정, 삭제와 같은 간단한 백엔드 로직을 쉽게 작성 가능
 *
 *
 *
 *
 * Next.js API Routes 사용 예시
 * 1. pages/api 디렉토리에 엔드포인트 파일을 생성
 * 2. 엔드포인트 파일 내에서 요청 메서드에 따른 로직 작성
 * 3. req 객체로부터 요청 데이터를 가져와 처리하고 res 객체로 응답을 보냄
 *
 *
 *
 *
 * HTTP메서드에 따른 Next.js API Routes 사용 (api2 사진)
 * - 요청 핸들러에서 req.method를 사용해 HTTP 메서드에 따라 API를 분리해서 적용할 수 있음
 * - 아래와 같이, HTTP 요청의 메서드(GET, POST, PUT, DELETE 등)에 따라 다른 코드 블록이 실행
 * - 파라미터를 사용하여 동적 엔드포인트를 생성할 수 있으며, 간단한 미들웨어를 적용하여 요청을 가로채로 처리할 수 있음
 *
 *
 *
 *
 * Next.js API Routes 장단점
 * - 간편한 백엔드 구축: 서버를 별도로 설정하거나 관리하지 않고도 서버리스 백엔드 엔드포인트를 쉽게 만들 수 있음
 * - 통합된 개발: 프론트엔드 및 백엔드를 동시에 개발하고 관리할 수 있어 개발 생산성이 향상
 * - 동적 라우팅: 동적 엔드포인트를 생성하고 파라미터를 활용하여 유연한 라우팅을 구현
 * - HTTP 메서드 처리: 다양한 HTTP 요청 메서드(GET, POST, PUT, DELETE 등)에 따른 로직 작성
 * - 다양한 응답 도우미 함수: res.json(), res.send(), res.status() 등과 같은 여러 함수 제공
 * - 복잡한 로직 제한: 복잡한 백엔드 로직이나 데이터 처리를 위해서는 외부 서버나 클라우드 함수가 필요
 * - 고급 기능 제한: 복잡한 인증, 보안, 데이터베이스 연결과 같은 고급 기능을 구현하기에는 한계
 */

/**
 * API Routes + prisma로 데이터 연동기기
 * - prisma를 사용해서 모든 store 데이터를 가져온 후, getServerSideProps에서 해당 API 호출
 */

/**
 * React Query란? (https://tanstack.com/)
 * - React Query: 리액트에서 복잡한 데이터 상태 및 비동기 작업 관리 간편하게 처리할 수 있는 라이브러리
 * - 데이터를 비동기적으로 처리하고, 데이터 캐싱, 리패칭, 뮤테이션 등과 같은 복잡한 데이터 관리 작업을 간 편하게 수행
 * - 캐싱 및 성능 최적화: React Query는 자동으로 데이터를 캐싱하여 네트워크 요청을 최소화함
 * - 데이터 동기화: 실시간 동기화를 지원하여 데이터가 변경될 때 자동으로 새로운 데이터 업데이트
 * - 서버 요청 관리: 쿼리를 통해 서버 요청을 효과적으로 관리 (중복 요청 방지, 요청 취소, 재시도)
 * - 그 외: 성숙한 생태계, 타입스크립트 지원, Next.js와의 통합, 비동기 작업 관리
 *
 *
 *
 *
 * React Query 주요 기능(react query1 사진)
 * - 데이터 가져오기와 캐싱: useQuery 함수를 사용하여 데이터 부럴오기, 자동 캐싱, 중복 요청 방지 가능
 * - 자동 리페치: 데이터를 주기적으로 업데이트해야 하는 경우, refetchInterval 옵션을 사용해서 설정 가능
 * - 뮤테이션: 데이터 변경 작업 (생성, 수정, 삭제)를 간단하게 수행할 때 사용 가능
 *
 *
 *
 *
 *
 * React Query 캐싱 (reactquery2 사진)
 * - React Query 캐싱: 데이터를 가져와서 처음 한 번 캐싱하면, 이후 동일한 데이터에 대한 요청은 네트워크 요청을 보내지 않고 캐시된 데이터를 사용
 * - staleTime 옵선: React Query에서 사용되는 중요한 옵션 중 하나로, 캐시된 데이터의 "잘못된" 상태(stale state)를 얼마 동안 허용할지 설정하는 데 사용
 * (잘못된 상태란? - 데이터가 업데이트 되었지만, 이전에 캐싱된 데이터가 여전히 사용 가능한 상태)
 * - staleTime은 기본적으로 0으로, 데이터가 한 번 불러와지면 다음 요청 시에는 항상 새로운 데이터를 가져옴
 *
 *
 *
 *
 *
 * React Query 주요 함수 (reactquery3 사진)
 * - useQuery: 데이터를 가져올 때 사용하는 함수. 데이터를 캐싱하고 자동으로 리페칭 관리, 로딩 에러, 데이터 등을 처리할 수 있는 옵션 제공
 * (
 * - isLoading: 데이터 가져오는 중인지 여부
 * - isError: 데이터 가져오는 중 에러 발생 여부
 * - error: 데이터 가져오는 중 발생한 에러 정보
 * )
 * - useQueryClient: 리액트 쿼리 클라이언트에 접근해서 다양한 작업 수행 가능 (캐시 조작, 캐시 데이터 작업 등)
 * (reactquery4 사진)
 * - useMutation: 데이터 변경 작업 수행에 사용
 * (
 * - useMutation 호출하여 mutation 객체 생성. 해당 객체에 함께 사용할 함수 정의
 * - 성공/실패 여부 처리 가능. 데이터 업데이트 후 리페치 관리
 * )
 *
 *
 *
 *
 * React Query 세팅방법
 * - 최상단 파일(_app.tsx)에 QueryClientProvider로 애플리케이션을 감싸고, queryClient 설정
 * const queryClient = new QueryClient()
 *
 * function App() {
 *  return (
 *    <QueryClientProvider client={queryClient}>
 *      <Todos />
 *    </QueryClientProvider>
 *  )
 * }
 *
 *
 *
 *
 * React Query와 Next.js (reactquery5 사진)
 * React Query는 Next.js 프로젝트에도 유용하게 적용할 수 있음
 * - SSR를 사용하는 경우, getServerSideProps 혹은 SSQ를 사용하는 경우, getStaticProps와 함께 리액트 쿼리를 사용할 수 있음
 * - React Query로 데이터를 미리 가져와 페이지를 서버에서 렌더링 가능
 */

/**
 * Axios란? (https://axios-http.com/kr/docs/intro)
 * - Axios: HTTP 클라이언트 라이브러리로, Next.js 프로젝트와 함께 사용하여 데이터를 서버에서 가져오는 데 유용
 * - 또한, React Query와 Axios를 함께 사용하면 더욱 편리하게 데이터를 캐싱하고 관리할 수 있음
 * 설치 방법: yarn add axios
 * - 기본 fetch API 보다 HTTP 요청 및 응답 처리, 설정, 요청 취소 등의 부분에서 더 풍부한 기능을 제공
 */

/**
 * React Query로 데이터 가져오기
 * - 데이터를 가져오기 위해서는 useQuery 훅을 사용
 * - queryKey: 쿼리를 고유하게 식별하는 문자열 키 (캐싱 및 데이터 관리)
 * - Fetch 함수: 데이터를 가져오는 비동기 함수, 서버에서 데이터 요청 & 반환
 * - isLoading: 데이터 가져오는 중인지 여부
 * - isError: 데이터 가져오는 중 에러 발생 여부
 * - data: 성공적으로 데이터를 가져온 경우, 데이터가 포함된 변수
 * - error: 데이터 가져오는 중 발생한 에러 정보
 */

/**
 * Pagination이란?
 * - Pagination: 웹 애플리케이션에서 긴 목록을 여러 페이지로 나누어 보여주는 기술
 * - 하나의 페이지에 모든 항목을 표시하면 사용자 경험이 좋지 않기 때문에, 긴 목록을 여러 페이지로 나누어 보여주면 사용자가 쉽게 정보를 찾을 수 있음
 * - Pagination은 주로 검색 결과, 게시글 목록, 제품 목록 등 다양한 웹 애플리케이션에서 사용됨
 * - Pagination은 서버에서 클라이언트로 데이터를 나누어 전송하므로, 대용량 데이터를 다룰 때 유용
 *
 *
 *
 *
 * Pagination 설계(pagination1 사진)
 * - 페이지 넘버를 query params로 넘겨서, 각 페이지에 맞는 데이터를 10개만 부러오도록 작업
 * - 총 페이지 수가 10개 이하인 경우에는, 각각 페이지를 클릭할 수 있도록 아래와 같이 모든 페이지 숫자를 화면에 나열하는 방식
 * - 만약 총 페이지 수가 10개보다 많은 경우에는, 현재 페이지 숫자만 화면에 표시하고, "이전"과 "다음" 버튼으로 페이지 이동
 */

/**
 * 무한 스크롤이란?
 * - 무한 스크롤(infinite scroll): 사용자 경험을 개선하기 위해 페이지 로딩 없이 스크롤을 통해 추가 데이터를 로드하는 기법
 * - 페이지 하단에 도달할 때 새로운 데이터를 가져와서 보여 줌
 * - 사용자가 스크롤을 위아래로 움직일 때 이벤트를 감지하고 추가 데이터를 가져오는 로직을 수행
 * - React Query의 Infinite Queryies를 사용해서 무한 스크롤을 구현할 수 있음
 * - 공식 도큐: https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
 *
 *
 *
 * React Query의 infiniteQuery란? (infinite1 사진)
 * - 무한 스크롤: 웹 애플리케이션에서 여러 페이지의 데이터를 동적으로 로드하는 기술
 * - React Query의 inifite query : 무한 스크롤을 지원하고, 화면 스크롤을 통해 추가 데이터를 자동로드할 수 있는 강력한 기능
 * - pagination 작업을 간소화하고, 데이터를 무한으로 스크롤링할 때 필요한 다양한 도구와 기능을 제공
 * - 사용자 경험을 향상시키며, 데이터를 효율적으로 로딩할 수 있음
 *
 *
 *
 *
 *
 * React Query의 infiniteQuery기능 (infinite2 사진)
 * React Query가 설칟괸 프로젝트에서, 아래와 같이 React Query를 사용하여 Infinite Query를 생성
 * - fetchPosts: 페이지별로 데이터를 가져오는 역할
 * - getNextPageParam: 콜백 함수를 사용해서 다음 페이지를 정의
 *
 *
 *
 *
 * React Query의 infiniteQuery 사용법 (infinite3 사진)
 * - 아래 예시: 데이터들을 사용해서 UI를 그리고, 무한 스크롤을 수동으로 제어할 수 있는 버튼 생성
 * - data.pages를 통해 페이지별로 데이터를 렌더링
 * - fetchNextPage 함수를 호출하여 다음 페이지의 데이터를 가져옴
 * - hasNextPage와 isFetching를 사용하여 무한스크롤 버튼을 제어
 *
 *
 *
 *
 * React Query의 infiniteQuery 사용법2 (infinite4 사진)
 * Intersection Observer를 활용해서, 특정 영역에 도달했을 때 다음 페이지를 가져오는 무한 스크롤 구현
 * - useIntersectionObserver 훅을 생성해서 리스트 하단에 도달했는지 (isIntersecting) 확인
 * - 만약 페이지 하단에 도달하고, 다음 페이지가 있다면 리액트 쿼리의 fetchNextPage() 함수 호출
 * - 마지막 페이지에 다다를 때 까지 위 단계들 반복
 *
 *
 *
 *
 *
 * Infinite Queries 주요 개념
 * - data: Infinite Query 결과 데이터
 * - data.pages: 가져온 페이지들의 배열
 * - data.pageParams: 페이지를 가져오기 위한 페이지 매개 변수. 배열의 형태.
 * - fetchNextPage, fetchPreviousPage: 다음 페이지 및 이전 페이지의 데이터를 가져오는 함수
 * - getNextPageParam. getPreviousPageParam: 다음 및 이전 페이지에 대한 매개 변수를 생성하는 함수
 * - hasNextPage, hasPreviousPage: 다음 페이지 및 이전 페이지가 있는지 여부를 나타내는 불리언 값
 * - isFetchingNextPage, isFetchingPreviousPage: 다음 페이지 또는 이전 페이지의 데이터를 가져오는 동 안 로딩 상태를 나타내는 불리언 값
 */
