export default function Study4() {
  return <div>Study4</div>;
}

/**
 * 좋아요 기능 구현
 * array-contains 연산자 사용
 * https://firebase.google.com/docs/firestore/query-data/queries?hl=ko#array_membership
 * 
 * ex)
import { query, where } from "firebase/firestore";  
const q = query(citiesRef, where("regions", "array-contains", "west_coast"));





우리는 좋아요 기능을 배열로 만들거기 때문에 해당 배열 필드를 추가하고 제거하는 arrayUnion, arrayRemove를 사용해야함
배열 요소 업데이트 - https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko#update_elements_in_an_array
arrayUnion, arrayRemove

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});




해당 도큐를 업데이틀 할 때 사용
문서 업데이트 - https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko#update-data
update()

import { doc, updateDoc } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true
});



정렬할 때 array-contains 연산자 사용
 */

/**
 * 댓글 기능 구현 (좋아요 기능 구현할 때 사용한 메서드 사용)
 *
 * 댓글 생성시: updateDoc, arrayUnion 사용
 * 댓글 삭제시: updateDoc, arrayRemove 사용
 */

/**
 * 팔로우/팔로잉 기능 구현 (follewer, following)
 *
 * 데이터 구조 잡는 방법 2가지
 * 1. 팔로잉/팔로워 목록을 사용자 문서에 배열로 저장 (배열에 각각 유저 아이디를 저장 - 앱이 커지거나 확장하기에는 어려운 데이터 구조임)
 * - 유저마다 팔로잉하는 유저 아이디를 가지고있고 팔로우 하는 유저 아이디도 배열로 갖고 있음 - 앱이 커지거나 확장하기에는 어려운 데이터 구조임 (2번 방법 추천)
 * 2. 팔로잉/팔로워 목록을 사용자 목록을 별도의 컬렉션에 저장
 * - 유저가 따로있고 유저1이 유저2를 팔로우 할 경우에 팔로잉이라는 컬렉션을 생성하고 유저1 안에 유저2가 들어가게됨
 * - 팔로워라는 컬렉션도 동시에 생성됨 (팔로우를 당한 유저2가 주체가 되고 그 안에 유저 1이 들어오는 방식)
 *
 *
 * 2방법 결론
 * 1) 팔로잉
 * - 유저가 팔로우하는 "팔로잉" 목록
 * - 하나의 유저당, 하나의 "팔로잉" 컬렉션을 가질 수 있음
 * - 해당 "팔로잉" 컬렉션에는 특정 유저가 팔로잉한 다른 유저들의 id를 저장
 *
 * 2) 팔로우
 * - 유저가 팔로우 되는 "팔로우" 목록
 * - 하나의 유저당, 하나의 "팔로우" 컬렉션을 가질 수 있음
 * - 해당 "팔로우" 컬렉션에는 특정 유저를 팔로우한 다른 유저들의 id를 저장
 *
 *
 *
 * 팔로우시: updateDoc, arrayUnion 사용
 * 팔로우 취소시: updateDoc, arrayRemove 사용
 */
