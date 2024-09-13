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

/**
 * 이미지 업로드 구현
 *
 * Firebase Storage란?
 * - 클라우드 스토리지를 활용해 사용자가 업로드한 미디어 파일 (이미지, 비디오, 음악 등)을 보관하고 관리할 수 있는 서비스
 *
 * - 확장성이 좋음: Google Cloud Storage 인프라 기반으로 작동. 필요한만큼 자동으로 확장되어 어떤 규모의 앱이든 쉽게 대응가능 & 빠른 액세스 제공
 * - 인증 및 보안: Firebase Authentication과 연동하여 파일에 대한 접근 권한 설정 가능
 * - 다양한 파일 형식 지원: 이미지, 비디오, 음악, 문서 등 다양한 형식 지원
 * - 편리한 이미지 조작: Firebase Storage로 업로드된 이미지를 리사이징 하거나, 필터를 적용하는 등의 작업을 쉽게 수행 가능
 *
 *
 *
 * 사용법
 * 1) 시작하기
 * - https://firebase.google.com/docs/storage?hl=ko 설정세팅
 * - 앱에 버킷 URL 추가
 *
 * 2) 참조 만들기
 * - 파일 업로드, 다운로드 ,삭제, 업데이트를 수행하려면 작업할 파일을 가리키는 참조를 생성해야함 (참조 == 클라우드 파일을 가리키는 포인터)
 * - 참조 만들기: getStorage()를 사용하여 스토리지 서비스의 인스턴스를 가져온 후, ref()를 호출 (해당 참조는 Cloud Storage 버킷의 루트를 가리킴)
 *
 * 3) 파일 업로드
 * - 우선 파일 이름을 포함하여 파일의 전체 경로를 가리키는 참조를 생성해야함
 * - Blob 또는 File에서 업로드, 바이트 배열에서 업로드, 문자열에서 업로드 방식이 있음
 * (문자열에서 업로드: uploadString() 메서드를 사용하여 원시 문자열, base64, base64url 또는 data_url로 인코딩된 문자열을 Cloud Storage에 업로드)
 *
 * 4) 파일 다운로드
 * - 우선 다운로드할 파일의 Cloud Storage 참조 생성
 * - getDownloadUrl() 메서드를 호출해 파일의 다운로드 URL를 가져옴
 * (혹은 이미지를 직접 다운받는 함수를 호출할 수도 있음: getBlob, getBytes, getStream(SDK 9.5 이상) )
 *
 * 5) 파일 삭제
 * - 삭제할 파일을 가르키는 참조 생성
 * - deleteObject() 메서드를 호출해 파일 삭제
 * (정상적으로 처리되면 Promise가 반환되고 Promise가 거부되면 오류가 반환)
 *
 * 6) 파일 보안
 * - Firebase Authentication과 마찬가지로, 보안 규칙을 생성할 수 있음
 * - https://firebase.google.com/docs/storage/security 에서 더욱 다양한 규칙 확인가능
 */

/**
 * 파일 업로드 (getStorage, ref)
 * https://firebase.google.com/docs/storage/web/upload-files?hl=ko&_gl=1*hzt6sc*_up*MQ..*_ga*NDU1MTE1Mjc5LjE3MjYwNDczNDA.*_ga_CW55HF8NVT*MTcyNjA0NzM0MC4xLjAuMTcyNjA0NzM0MC4wLjAuMA..
 * 
 * ex)
import { getStorage, ref } from "firebase/storage";

// Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 





문자열에서 업로드 uploadString() - base64, base64url 또는 data_url로 인코딩된 문자열을 Cloud Storage에 업로드할 수 있음
https://firebase.google.com/docs/storage/web/upload-files?hl=ko&_gl=1*hzt6sc*_up*MQ..*_ga*NDU1MTE1Mjc5LjE3MjYwNDczNDA.*_ga_CW55HF8NVT*MTcyNjA0NzM0MC4xLjAuMTcyNjA0NzM0MC4wLjAuMA..

ex)
import { getStorage, ref, uploadString } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

// Raw string is the default if no format is provided
const message = 'This is my message.';
uploadString(storageRef, message).then((snapshot) => {
  console.log('Uploaded a raw string!');
});

// Base64 formatted string
const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message2, 'base64').then((snapshot) => {
  console.log('Uploaded a base64 string!');
});

// Base64url formatted string
const message3 = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message3, 'base64url').then((snapshot) => {
  console.log('Uploaded a base64url string!');
});

// Data URL string
const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message4, 'data_url').then((snapshot) => {
  console.log('Uploaded a data_url string!');
});





파일의 다운로드 URL 가져오기 getDownloadURL()
https://firebase.google.com/docs/storage/web/download-files?hl=ko&_gl=1*wup5og*_up*MQ..*_ga*NDU1MTE1Mjc5LjE3MjYwNDczNDA.*_ga_CW55HF8NVT*MTcyNjA0NzM0MC4xLjAuMTcyNjA0NzM0MC4wLjAuMA..#download_data_via_url

ex)
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
getDownloadURL(ref(storage, 'images/stars.jpg'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });
 */

/**
 * 이미지 업로드 구현
 * Firebase storage로 업로드한 이미지 수정/삭제하기
 * 
 파일의 다운로드 URL 가져오기 getDownloadURL()
https://firebase.google.com/docs/storage/web/download-files?hl=ko&_gl=1*wup5og*_up*MQ..*_ga*NDU1MTE1Mjc5LjE3MjYwNDczNDA.*_ga_CW55HF8NVT*MTcyNjA0NzM0MC4xLjAuMTcyNjA0NzM0MC4wLjAuMA..#download_data_via_url

ex)
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
getDownloadURL(ref(storage, 'images/stars.jpg'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });



  파일 삭제하기 (deleteObject) - 게시글 삭제 한다고 사진이 삭제되지는 않음 (firestore, storage랑 별개임)
  https://firebase.google.com/docs/storage/web/delete-files?hl=ko&_gl=1*8ke4f7*_up*MQ..*_ga*MjA2MDI5MjYwOS4xNzI2MTI3ODQ4*_ga_CW55HF8NVT*MTcyNjEyNzg0Ny4xLjAuMTcyNjEyNzg0Ny4wLjAuMA..#delete_a_file

  ex)
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, 'images/desert.jpg');

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
}).catch((error) => {
  // Uh-oh, an error occurred!
});
 */

/**
 * 프로필 이미지 업로드 기능 구현 - https://firebase.google.com/docs/auth/web/manage-users?hl=ko
 * updateProfile 메서드 사용하기
 * 
 * ex)
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
 */
