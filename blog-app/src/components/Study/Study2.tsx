export default function Study2() {
  return <div>study2</div>;
}

/**
 * 게시판 CR(create, read) 구현
 * Firestore란?
 * Firestore: Firebase에서 제공하는 NoSQL 형식의 클라우드 데이터베이스
 * - 애플리케이션 개발을 하다보면 데이터를 저장하고 불러오는 일이 매우 중요한데, Cloud Firestore는 이러한 일을 쉽게 도와줌
 * - Firestore는 실시간 데이터 동기화를 지원하며, 웹, 안드로이드, ios에서 데이터를 저장하고 동기화할 수 있음
 * - 데이터는 문서(document)와 컬렉션(collection)의 형태로 저장되며, 이는 효율적인 쿼리 작성을 가능하게 함
 * - 오프라인 지원 제공
 * 
 * Firestore 장점
 * 1. 실시간 데이터 동기화
 * - 실시간 채팅 및 데이터 분석 등 실시간 기능 애플리케이션 개발
 * 2. 구조화된 데이터
 * - 문서 - 컬렉션 형태로 데이터 저장 / 구조화된 데이터 쉽게 저장하고 불러올 수 있음
 * 3. 보안
 * - 사용자 기반의 보안규칙 설정 가능
 * 
 * Firestore 사용예시
 * 1. 다양한 유형의 애플리케이션에 사용 ex) 실시간 채팅 앱
 * 2. 다양한 데이터 저장 및 불러올 수 있음 ex) 게임 점수, 사용자 설정, 텍스트, 이미지
 * 3. 사용자별 데이터 접근 권환 관리
 * - 사용자 인증 정보와 함께 사용됨
 * 
 * 사용법
 * 1. Firebase 프로젝트 생성 & Firebase SDK 앱 추가
 * 2. Firestore 인스턴스 가져오기 - getFirestore
 * 3. Firebase 서비스 사용하기
 * 
 * 보안규칙
 * https://firebase.google.com/docs/rules/get-started?hl=ko&authuser=0&_gl=1*s44exs*_ga*MTc5MTAyMzQwOS4xNzIyMTYzMzEz*_ga_CW55HF8NVT*MTcyNDA5MzQwMS4xMS4xLjE3MjQwOTM1MzkuNTEuMC4w
 * 
 * addDoc
 * - firestore로 데이터 생성 로직 작성 - setDoc은 문서마다 id값이 있을때 사용, addDoc은 문서마다 id값이 없을때 사용
 * addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      })
 */

/**
 * Firestore로 데이터 가져오기: 게시글 리스트 작업
 *
 * 컬렉션의 모든 문서 가져오기
 * https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&_gl=1*euw6lu*_up*MQ..*_ga*Mjg3NDEwMzExLjE3MjQ5NDU3MDQ.*_ga_CW55HF8NVT*MTcyNDk0NTcwNC4xLjAuMTcyNDk0NTcwNC4wLjAuMA..
 *
 * getDocs(collection(db, "포스트 이름"))
 * 
 * 예시
import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
 */

/**
 * 문서 가져오기
 * https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&_gl=1*euw6lu*_up*MQ..*_ga*Mjg3NDEwMzExLjE3MjQ5NDU3MDQ.*_ga_CW55HF8NVT*MTcyNDk0NTcwNC4xLjAuMTcyNDk0NTcwNC4wLjAuMA..#web-modular-api_8
 * 
 * 예시
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "컬레션 이름", "포스트 아이디");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
 */

/**
 * 게시판 UD 업데이트, 삭제 구현
 * 
 * 문서 업데이트
 * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
 * 
 * 예시
import { doc, updateDoc } from "firebase/firestore";

const washingtonRef = doc(db, "cities", 아이디 값);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true
});
 */

/**
 * 게시글 삭제 구현
 * 
 * 문서 삭제
 * https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ko&_gl=1*8nsw1v*_up*MQ..*_ga*MjQwNDI5NjcyLjE3MjUwMTM0ODA.*_ga_CW55HF8NVT*MTcyNTAxMzQ4MC4xLjAuMTcyNTAxMzQ4MC4wLjAuMA..
 * 
 * 예시
import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, "cities", 아이디 값));
 */

/**
 * Firestore 쿼리 적용하기 - 내가 쓴 글 탭 구현
 * 
 * 간단한 쿼리
 * https://firebase.google.com/docs/firestore/query-data/queries?hl=ko
 * 
 * 예시
// Create a reference to the cities collection
import { collection, query, where } from "firebase/firestore";
const citiesRef = collection(db, "cities");

// Create a query against the collection.
const q = query(citiesRef, where("state", "==", "CA"));

- query와 where 함수를 사용해서 Ref를 통해 query와 where문을 적용할거임 - 유저의 uid가 로그인 된 내 uid와 같은지 where문을 통해서 내 글만 가져오도록 할거임

색인
https://firebase.google.com/docs/firestore/query-data/indexing?hl=ko

firestore에서 복잡한 query를 사용하려면 색인을 반드시 생성해야함 - query 작업하면서 색인도 작업 해줘야함
 */

/**
 * postlist 순서 이상하게 나오는거
 * 1.
 * new Date()?.toLocaleDateString("ko", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }
    이렇게 변경
    2. 데이터 정렬 및 제한
    https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko&_gl=1*1tqehux*_up*MQ..*_ga*OTU0NjMzMjAzLjE3MjUwMTY0Mzg.*_ga_CW55HF8NVT*MTcyNTAxNjQzOC4xLjAuMTcyNTAxNjQzOC4wLjAuMA..
    
    예시
    import { query, orderBy, limit } from "firebase/firestore";
    const q = query(citiesRef, orderBy("name"), limit(3));
    
 */
