import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";
import Router from "./components/Router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// yarn create react-app blog-app --template typescript

function App() {
  const auth = getAuth(app); // getAuth는 app을 넣어줘야 동작 함
  // console.log(auth) 콘솔에 찍어보면 가장 중요한 currentUser가 null로 뜸 (아직 사용자가 로그인 되지 않았다라는 뜻)
  // Firebase Auth - auth.currentUser가 있으면 true 없으면 false 따라서 처음에는 로그인 인증이 안되어 있으므로 false 인증되었으면 true로 반환
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  return (
    <>
      <ToastContainer />
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
