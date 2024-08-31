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

/**
 * firebase 및 API 키 보안
 *
 * firebase 콘솔에서
 * 1. firebase authorization 승인된 도메인 설정 - 지금은 기본 localhost 인데 나중에는 배포 사이트 주소로 변경해야함
 * 2. firestore의 기본 보안규칙 (rules) 변경 - 지금은 기본 test로 해놔서 90일 동안 모든 사용자가 모든 요청 가능한데 모든 요청 가능하면 보안상 안좋으므로 수정해야 함
 * 원래코드
 * rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 9, 18); // 모두 요청가능함
    }
  }
}
보안 규칙 사이트 
https://firebase.google.com/docs/rules/get-started?hl=ko&authuser=0&_gl=1*qdahqi*_ga*MTc5MTAyMzQwOS4xNzIyMTYzMzEz*_ga_CW55HF8NVT*MTcyNTEwMzAwNC4yMi4xLjE3MjUxMDMzOTAuNy4wLjA.

보안 규칙 작성 => 기본 보안 규칙 => 인증된 모든 사용자
예시
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
 * 
 * 3. google cloud 콘솔에 들어가서 api key 보안 작업 할거임
 * - 1. 블로그 프로젝트 선택
 * - 2. api keys => browser key 선택 => 애플리케이션 제한사항 설정 => 웹 사이트 => 승인된 url 추가
 * - 3. test.com/* 형식으로 도메인 추가(localhost, firebase 도메인)
 * 
 * 
 * 구글 클라우드 콘솔
 * https://cloud.google.com/cloud-console/?utm_source=google&utm_medium=cpc&utm_campaign=japac-KR-all-ko-dr-BKWS-all-mv-trial-PHR-dr-1605216&utm_content=text-ad-none-none-DEV_c-CRE_631263160246-ADGP_Hybrid+%7C+BKWS+-+BRO+%7C+Txt+-Management+Tools-Cloud+Console-google+cloud+console-main-KWID_43700077715669141-kwd-296393718382&userloc_1030747-network_g&utm_term=KW_google+cloud+console&gad_source=1&gclid=Cj0KCQjw_sq2BhCUARIsAIVqmQtE84Sf3O4iRaGiiUrhpW8MHuHQXMhHbOJe_OJCoYyMhN0q7OIeGk4aAoEwEALw_wcB&gclsrc=aw.ds&hl=ko
 * 
 * key=API_KEY
 * AIzaSyD5v_9zyxSC2e151F_LDovGmaTpmWQSJ0Y
 */

/**
 * Firebase CLI 설명, 세팅
 * https://firebase.google.com/docs/cli?authuser=0&_gl=1*1kbs2a2*_up*MQ..*_ga*MjM0NDQ1MTc5LjE3MjUxMTU4MzM.*_ga_CW55HF8NVT*MTcyNTExNTgzMy4xLjAuMTcyNTExNTgzOC4wLjAuMA..&hl=ko
 * 
 * Firebase CLI (Command Line Interface)
 * - Firebase 프로젝트를 관리하고 다양한 Firebase 기능을 로컬에서 사용할 수 있게 해줌
 * - Firebase 프로젝트 설정, 데이터 베이스, Cloud Function, 호스팅 등 관리
 * 
 * Firebase CLI 설치 방법
 * 1. node.js 및 npm 설치 (사전에 작업됨)
 * 2. npm install -g firebase-tools
 * 3. firebase login (로그인 후 테스트)
 * 4. firebase project:list (파이어베이스 프로젝트 확인)
 */

/**
 * firebase로 배포하기
 * 
 * 1. 우선 firebase cli로 초기화
 * firebase init hosting
 * 
 * 2. command line에 아래와 같이 입력
 * - Use an existing project
 * - fastcampus-react-blog
 * - What do you want to use as your public directory? => "build" 입력
 * - Configure as a single-page app (rewrite all urls to /index.html) => yes
 * - Set up automatic builds and deploys with GitHub? => yes
 * 
 * 3. 사이트 배포
 * - yarn build (빌드 후 배포)
 * - firebase deploy --only hosting
 * - 배포된 url 확인 (https://XXX-XXX-XXX.web.app)
 * 
 * 4. Google console 및 Firebase 보안 적용
 * - Firebase Auth > settings > 승인된 도메인 추가
 * - Google console > API > 보안 URL 추가
 */
