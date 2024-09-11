export default function Study3() {
  return;
}

/**
 * 해시태그 검색하기 기능 구현
 * 
 * array-contains-any 연산자 사용하기 (지정된 필드 즉, 해시태그라는 배열에서 특정 해시태그가 포함되어 있는지 안되어있는지 확인할 수 있도록 도와주는 연산자임)
 * https://firebase.google.com/docs/firestore/query-data/queries?hl=ko#in_and_array-contains-any
 * 
 * ex) 쿼리 사용해야함  => search page
import { query, where } from "firebase/firestore";  

const q = query(citiesRef, 
  where('regions', 'array-contains-any', ['west_coast', 'east_coast']));
 */
