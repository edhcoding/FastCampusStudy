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
