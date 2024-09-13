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
