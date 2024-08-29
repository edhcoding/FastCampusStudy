import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter as Router 이런식으로 불러오는 이름 변경 가능함
import { AuthContextProvider } from "context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// AuthContextProvider에 value={{ user: currentUser }} user
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
