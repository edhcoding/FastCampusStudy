import { Link } from "react-router-dom";

export function Profile() {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">mephisto@naver.com</div>
          <div className="profile__name">은동혁</div>
        </div>
      </div>
      <Link to="/" className="profile__logout">로그아웃</Link>
    </div>
  );
}
