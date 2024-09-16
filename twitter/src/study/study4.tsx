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
 * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko#add_a_document
 * setDoc() - updateDoc()이 아닌 setDoc() 사용 (단일 문서를 만들거나 덮어쓸 때 사용 - 문서가 없으면 생성, 있으면 덮어써 기존 문서 업데이트)
 * import { doc, setDoc } from "firebase/firestore"; 

const cityRef = doc(db, 'cities', 'BJ');
setDoc(cityRef, { capital: true }, { merge: true });
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
 * 
 * 
 * 
 * 
 */

/**
 * 오해할만한 메서드
 *
 * 1) 데이터 생성 (setDoc VS addDoc)
 * 데이터는 setDoc과 addDoc으로 추가해 줄 수 있습니다.
 * 두 함수의 차이점은, setDoc의 경우 ID를 직접 지정할 수 있으나, addDoc은 아이디가 자동으로 생성 된다는 것입니다.
 * 두 함수 사용하는 형식은 거의 동일합니다. 함수(콜렉션, 데이터) 방식으로 호출하면 된다.
 *
 * // 데이터 id 지정해서 추가
 * await setDoc(doc(db, "cities", "new-city-id"), data);
 *
 * // 데이터 추가 (id는 자동 생성됨)
 * const docRef = await addDoc(collection(db, "cities"), {
 *  name: "Tokyo",
 *  country: "Japan"
 * });
 *
 *
 * 2) 데이터 수정 (setDoc VS updateDoc)
 * setDoc - 단일 문서를 만들거나 덮어쓰려면 set() 메서드를 사용합니다.
 * updateDoc - 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트하려면 update() 메서드를 사용합니다.
 *
 * 두 함수의 차이점은, updateDoc의 경우 특정 필드만 수정 할 수 있고, setDoc은 지정한 데이터를 통째로 변경해버립니다.(지정한 데이터가 없다면 추가함)
 * updateDoc으로 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트 할 수 있습니다.
 * setDoc으로 문서를 일괄 업데이트 할 수 있습니다.
 *
 *
 * 3) 데이터 삭제 (deleteDoc VS updateDoc, deleteField)
 * 도큐먼트를 한번에 삭제하고 싶다면 deleteDoc를 사용하면 되고, 특정 필드만 지우고 싶다면 deleteField와 updateDoc를 사용할 수 있습니다.
 */

/**
 * 알림 기능 구현
 * 알림 기능이란 - 다른 사용자가 내 게시물에 글을 남겼거나 나를 팔로우 했을때 나의 알림에 나오도록 하는 것
 *
 * 설계하기
 * 언제 알림을 생성할까?
 * 1. 특정 사용자를 "팔로우" 했을 때
 * 2. 특정 사용자의 글에 "댓글"을 남겼을 때
 *
 * 어떤 방식으로 알림을 보여줘야 할까?
 * 1. 리스트 형식으로 사용자의 알림만 모아서 보여주기
 * 2. 만약 "댓글"을 남긴 알림이라면, 눌렀을 때 해당 게시글로 이동하게 하기
 * 3. 확인한 알림과 그렇지 않은 알림 구분하기
 *
 * Notifications Collection 만들꺼임
 * UserID => content, createdAt, isRead, uid, url (isRead - boolean, 나머지 다 string)
 * content - 알림내용. 팔로잉 했을 때와 댓글을 남겼을 때 두 가지 내용이 있음
 * isRead - 해당 알림을 읽었는지 아닌지 표시 기본값 false
 * uid - 해당 알림 사용자 id
 * url - 알림 눌렀을 때 이동하는 url
 */
