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
