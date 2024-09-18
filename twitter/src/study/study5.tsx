export default function Study5() {
  return <div>Study5</div>;
}

/**
 * 다국어 처리 구현 - 전역 상태 라이브러리 recoil 사용해서 구현할 예정
 *
 * Recoil이란?
 * - React 애플리케이션 상태 관리를 위한 라이브러리
 * - Facebook (메타)에서 개발한 상태 관리 라이브러리로, Atom 이라는 단위로 상태를 정의하고 이를 이용해 컴포넌트 사이에서 데이터를 공유하며 상태를 업데이트함
 *
 * 왜 하필 Recoil를 사용하는가?
 * - 간편한 상태관리: 간편하게 상태를 정의하고 관리할 수 있음
 * - 최적화된 리렌더링: 내부적으로 최적화되어 필요한 경우에만 리렌더링
 * - 복잡한 애플리케이션에 적합: 복잡한 상태 관리를 효과적으로 다루는데 적합함
 *
 *
 *
 * Recoil 기능: Atom, Selector
 * Atom: 앱의 상태를 정의하는 단위로, atom 함수를 통해 생성
 * ex)
 * import { atom } from 'recoil';
 *
 * const userState = atom({
 *  key: 'userState',
 *  default: null,
 * });
 *
 * Selector: 파생된 상태를 만들어 내는 함수로, 다른 atom이나 selector로부터 값을 계산
 * ex)
 * import { selector } from 'recoil';
 *
 * const userNameState = selector({
 *  key: 'userNameState',
 *  get: ({get}) => {
 *    const user = get(userState);
 *    return user ? user.name : 'Guest';
 *  },
 * });
 *
 *
 *
 *
 * Recoil 훅: useRecoilState
 * - Atom 값을 읽고 업데이트하는데 사용되는 훅. useState과 비슷한 구조이지만 전역 상태를 다룬다는 점에서 차이
 * ex)
 * import { atom, useRecoilStata, RecoilRoot } from 'recoil';
 *
 * const countState = atom({
 *  key: 'countState',
 *  default: 0,
 * });
 *
 * function Counter() {
 *  const [count, setCount] = useRecoilState(countState);
 *
 *  return (
 *    <div>
 *      <p>Count: {count}</p>
 *      <button onClick={() => setCount(count + 1)}>Increment</button>
 *      <button onClick={() => setCount(count - 1)}>Decrement</button>
 *    </div>
 *  );
 * }
 *
 *
 *
 * Recoil 훅: useRecoilValue
 * - 단순히 Atom 값을 읽는데에 사용되며, 상태 업데이트를 트리거하지 않음
 * ex)
 * import { selector, useRecoilValue, RecoilRoot } from 'recoil';
 *
 * const userNameState = selector({
 *  key: 'userNameState',
 *  get: ({ get }) => {
 *    const user = get(userState);
 *    return user ? user.name : 'Guest';
 *  },
 * });
 *
 * function UserInfo() {
 *  const userName = useRecoilValue(userNameState);
 *
 *  return <p>Welcome, {userName}!</p>;
 * }
 *
 *
 *
 * Recoil 훅: useSetRecoilState
 * - Atom 값을 업데이트하는 setter 함수를 반환함
 *
 * import { atom, useSetRecoilState, RecoilRoot } from 'recoil';
 *
 * const countState = atom({
 *  key: 'countState',
 *  default: 0,
 * });
 *
 * function Counter() {
 *  const setCount = useSetRecoilState(countState);
 *
 *  return (
 *    <div>
 *      <button onClick={() => setCount((prevCount) => prevCount + 1)}>Increment</button>
 *    </div>
 *  );
 * }
 *
 *
 *
 * Recoil 훅: useResetRecoilState
 * - Atom 값을 초기값으로 리셋하는 함수를 반환함
 * ex)
 * import { atom, useResetRecoilState, RecoilRoot f from 'recoil';
 *
 * const countState = atom({
 *   key: 'countState',
 *   default: 0,
 * });
 *
 * function ResetButton () {
 *   const resetCount = useResetRecoilState(countState);
 *
 *   return <button onClick={resetCount}>Reset Count</button>;
 * }
 */

/**
 * 반응형 웹이란?
 * - 반응형 웹: 웹사이트를 다양한 디바이스와 화면 크기에 맞게 조정하여 최적의 사용자 경험을 제공
 *  - 사용자가 데스크톱, 태블릿, 스마트폰 등 다양한 환경에서 웹사이트를 이용할 때, 디자인이 자동으로 조절되어 최상의 레이아웃과 가시성을 유지
 *  - ex) Media Query를 상용해서 반응형 웹 구현 가능
 *
 *
 * Media Query란?
 * - Media Query는 CSS에서 사용되는 조건부 스타일링 기법으로, 특정 조건에 따라 스타일을 변경할 수 있게함
 *  - 미디어 유형, 뷰포트 크기, 장치의 해상도 등과 같은 조건에 따라 스타일 조절 가능
 *
 * - 장점:
 * 1) 다양한 환경에서 일관된 사용자 경험 제공 / 다양한 장치 및 화면 크기 대응
 * 2) SEO에 최적화되어 유리한 결과를 가져올 수 있음
 * 3) 향상된 성능과 속도 제공
 *
 * - 단점:
 * 1) 디자인 및 스타일 유지 관리 어려울 수도 있음
 * 2) 개발 시간 및 비용 증가
 */

/**
 * firebase 및 api 키 보안 작업
 * 1. firebase authentication 승인된 도메인 설정 - (보안을 위해 전화 인증, Google 인증, 타사 인증을 사용하려면 도메인에서 OAuth 리디렉션을 승인받아야 합니다.)
 * 2. firestore 및 storage의 기본 보안규칙 (rules) 변경
 * 3. https://console.cloud.google.com/apis/credentials 에서 api key 보안 작업
 *  - 트위터 프로젝트 선택
 *  - api keys => browser key 선택 => 애플리케이션 제한사항 설정 => 웹사이트 => 승인된 url 추가
 *  - test.com/* 형식으로 도메인 추가 (localhost, firebase 도메인x)
 *  - 내가정리 (api 및 서비스 => 사용자 인증 정보 => api키 체크 or 위험 표시 클릭 => 애플리케이션 제한 사항 설정 없음을 웹사이트로 변경 => 웹 사이트 제한사항에 승인된 도메인꺼 복붙 아래 두개는 /* 붙이기 => api 제한사항은 키 제한 없음이 default 저장 끝 )
 */

/**
 * Vercel 이란? (https://vercel.com/eundonghyeoks-projects)
 * - 정적 웹사이트 및 애플리케이션을 빌드 & 배포하기 위한 클라우드 플랫폼
 * - 프론트 & 백엔드 개발자들이 코드를 더 쉽게 배포하고 호스팅 할 수 있게 도와줌
 * - Github, GitLab, Bitbucket 등과 연동하여 CI/CD를 간편하게 설정할 수 있음
 * - 사용성과 확장성이 좋아 인기를 얻고 있음
 * - Next.js와의 시너지가 극대화 됨. 빠르고 효율적인 웹 애플리케이션 개발 및 배포 환경 구축
 *
 *
 *
 * Vercel 주요 기능
 * - 정적 웹 애플리케이션 호스팅: 정적 파일로 구성된 웹 애플리케이션 배포 & 호스팅
 * - 빠른 배포: Git 저장소와 연동하여 변경사항이 발생하면 자동으로 배포
 * - CI/CD 통합: Github Actions, GitLab CI 등과 연동하여 지속적 통합 & 배포 설정
 * - 환경 변수 관리: 환경 변수 설정 지원 & 애플리케이션의 보안과 환경 설정 관리
 * - 도메인 관리: 사용자의 도메인을 Vercel 플랫폼에 연결할 수 있도록 도와줌
 * - 서버리스 함수: Serverless Functions를 제공하여 손쉽게 백엔드 기능 구축 가능
 * - 애널리틱스: 애플리케이션 성능 및 사용통계 수집 & 모니터링 도구 제공
 *
 *
 *
 * Vercel 장단점
 * 장점
 * - 빠른 배포: 몇가지 명령어로 빠르게 배포가 가능함
 * - 간편한 연동: 다양한 버전 관리 툴과 연동 가능
 * - CI/CD 자동: Git 저장소 및 Gitlab 등과 통합하여 CI/CD 자동화 기능
 * - 글로벌 CDN: 최적화된 성능을 제공하는 글로벌 CDN 제공
 *
 * 단점
 * - 동적 콘텐츠 처리 어려움: 정적 웹 애플리케이션에 특화
 * - 제한된 백엔드 기능: 서버리스 아키텍쳐의 한계
 *
 *
 *
 *
 * Vercel로 배포하기
 * - Vercel CLI로 배포: 프로젝트 디렉토리에서 Vercel CLI를 사용해서 수동 배포 (명령어: Vercel)
 * - Github/GitLab 연동 배포: Github, GitLab과 Vercel를 연동하여 저장소에 변경사항이 푸시될 때 마다 자동으로 배포
 * - 환경 변수 설정: Vercel 대시보드나 CLI를 통해 환경변수 설정
 */

/**
 * Vercel CLI로 배포
 *
 * Vercel CLI: 프로젝트를 로컬 환경에서 배포하기 위한 커맨드 라인 도구
 * Vercel CLI를 사용하면 프로젝트를 효율적으로 관리할 수 있음
 *
 * 사용법
 * 1) Vercel CLI 설치
 * - npm install -g vercel
 * - yarn global add vercel
 * - 잘 설치되었는지 확인법: vercel --version
 * 2. Vercel 로그인
 * - vercel login
 * 3) 프로젝트 배포
 * - vercel
 * 4) 프로젝트 삭제
 * - vercel remove
 *
 *
 *
 *
 * Vercel 명령어 입력 후 작업
 * - Set up and deploy"~react-twitter"? [Y/n] => Y
 * - Link to existing project? [y/N] => N - 기존 프로젝트인지 우린 새로운 프로젝트이므로 N
 * - What's your project's name? (react-twitter) - 프로젝트 이름
 * - In whitch directory is your code located? ./ - directory는 ./ 루트 디렉토리
 * - Auto detected Project Settings (Created React App)
 *     - 기본 설정 적용, Output Directory: build
 * - Want to modify these settings? [y/N]
 *     - Linked to 깃헙레포/react-twitter ~~
 *     - 빌드 완료
 * 
 * 
 * 
 * 
 * Vercel 사이트에서 환경변수 입력
 * - project > settings > environment variables
 * - 환경 변수 설정 후 다시 배포, firebase 및 google api에 생성된 url 입력
 */
