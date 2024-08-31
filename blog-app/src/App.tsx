import { useContext, useEffect, useState } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./components/Router";
import Loader from "components/Loader";
import { ThemeContext } from "context/ThemeContext";

// yarn create react-app blog-app --template typescript

function App() {
  const context = useContext(ThemeContext);

  const auth = getAuth(app); // getAuth는 app을 넣어줘야 동작 함
  // console.log(auth) 콘솔에 찍어보면 가장 중요한 currentUser가 null로 뜸 (아직 사용자가 로그인 되지 않았다라는 뜻)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser // 자바스크립트에서 느낌표두개(!!)는 다른 타입의 데이터를 boolean 타입으로 명시적으로 형 변환(Type Conversion)하기 위해 사용함
    // Firebase Auth - auth.currentUser가 있으면 true 없으면 false 따라서 처음에는 로그인 인증이 안되어 있으므로 false 인증되었으면 true로 반환
  );
  const [init, setInit] = useState<boolean>(false);
  // init은 auth를 체크하기 전(initialize 전)에는 loader를 띄워주는 용도임

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <div className={context.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;
