export default function Study3() {
  return <div>공부 화이팅</div>;
}

/**
 * Context API로 다크모드 구현
 *
 * ThemeContext 파일 생성
 * localStorage 사용으로 화면 껏다 켜도 변경 안되게 함
 */

/**
 * 댓글 폼 작업
 * 
 * 문서 업데이트
 * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
 * 
 * 예시
import { doc, updateDoc } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true
});


배열 요소 업데이트는 arrayUnion()을 사용할 거임

배열 요소 업데이트 
https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko

삭제는 arrayRemove()
 */
