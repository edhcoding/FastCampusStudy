import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "firebaseApp";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({ user: null as User | null }); // ()소괄호 안에는 초깃값

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  /**
   * onAuthStateChanged
   * 인증 상태가 변경될 때마다 호출되는 리스너 설정 (로그인, 로그아웃) => 사용자가 로그인 or 로그아웃 할 때 마다 실시간으로 호출 됨
   */

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // user
      } else {
        setCurrentUser(user); // null
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
