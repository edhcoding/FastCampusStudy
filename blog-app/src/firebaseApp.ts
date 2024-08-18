import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

/**
 * - initializeApp - initializeApp 함수는 Firebase 애플리케이션을 초기화합니다. 이 함수는 Firebase 프로젝트의 구성 객체를 사용하여 Firebase 서비스를 설정합니다. 프로젝트에서 처음으로 Firebase를 사용할 때 호출해야 합니다.
 * - FirebaseApp - FirebaseApp은 Firebase SDK에서 제공하는 기본 객체로, Firebase 프로젝트를 초기화하고 다양한 Firebase 서비스를 사용할 수 있도록 해주는 역할을 합니다.
 *   FirebaseApp 객체를 통해 Firebase 프로젝트와 상호작용할 수 있으며, 다양한 Firebase 서비스(예: Firestore, Authentication, Storage 등)를 사용할 때 이를 기반으로 설정을 관리합니다.
 * - getApp - getApp 함수는 초기화된 Firebase 애플리케이션 인스턴스를 반환합니다. 일반적으로 initializeApp 함수로 Firebase 애플리케이션을 초기화한 후, 다른 모듈이나 파일에서 동일한 Firebase 앱 인스턴스를 가져와야 할 때 사용합니다.
 */

export let app: FirebaseApp; // app은 변수명 FirebaseApp은 타입

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

try {
  app = getApp("app"); //  처음에 app을 가져올 때 app이 initialize 됬다면 기존의 초기화 된 app을 가져오고
} catch (e) {
  app = initializeApp(firebaseConfig, "app"); // 그게 아니라면 초기화 하라는 말 임
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig); 원래코드
const firebase = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default firebase;

// 원래 코드
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyAvJUzM_Nfo9o16VpG6gvab4uJHeCs_5-o",
//   authDomain: "toyprojects-c42c5.firebaseapp.com",
//   projectId: "toyprojects-c42c5",
//   storageBucket: "toyprojects-c42c5.appspot.com",
//   messagingSenderId: "325369812734",
//   appId: "1:325369812734:web:dee0bc71a845beb21337af"
// };

// const app = initializeApp(firebaseConfig);
