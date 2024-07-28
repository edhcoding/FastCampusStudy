import { Navigate, Route, Routes } from "react-router-dom";
import Home from "pages/home";
import PostsPage from "pages/posts";
import PostDetailPage from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";

// Navigate 의 replace 속성은 이전 페이지로 못 돌아가게 막음

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/new" element={<PostNew />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
