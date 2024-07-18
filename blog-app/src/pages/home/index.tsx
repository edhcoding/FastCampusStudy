import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <Link to="/posts/new">글 쓰기</Link>
          <Link to="/posts">게시글</Link>
          <Link to="/profile">프로필</Link>
        </div>
      </header>
      <div className="post__navigation">
        <div className="post__navigation--active">전체</div>
        <div>나의 글</div>
      </div>
      <div className="post__list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">은동혁</div>
                <div className="post__date">2024.07.18 목요일</div>
              </div>
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tenetur reprehenderit at, consectetur quas fuga aut, molestias
                saepe consequuntur eligendi ipsum et! Quis recusandae ipsum
                dicta autem aspernatur in labore nobis?Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Blanditiis voluptas aliquid,
                veritatis recusandae tempore voluptates hic optio, quaerat
                libero laudantium aperiam magni possimus maiores perferendis
                maxime facilis debitis odio ducimus?
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <footer>
        <Link to="/posts/new">글 쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </footer>
    </div>
  );
}
