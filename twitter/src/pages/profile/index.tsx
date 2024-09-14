import PostBox from "components/\bposts/PostBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PROFILE_DEFAULT_URL = "/logo192.png";

type TabType = "my" | "like";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("my");
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      const myPostQuery = query(
        postsRef,
        where("uid", "==", user?.uid), // 해당 유저 데이터만 보여줘야해서 home 코드가지고 와서 where문 추가
        orderBy("createdAt", "desc")
      );

      const likePostQuery = query(
        postsRef,
        where("likes", "array-contains", user?.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(myPostQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setMyPosts(dataObj as PostProps[]);
      });

      onSnapshot(likePostQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setLikePosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home__top">
      <div className="home__title">Profile</div>
      <div className="profile">
        <img
          src={user?.photoURL || PROFILE_DEFAULT_URL}
          alt="profile"
          className="profile__image"
          width={100}
          height={100}
        />
        <button
          type="button"
          className="profile__btn"
          onClick={() => navigate("/profile/edit")}
        >
          프로필 수정
        </button>
      </div>
      <div className="profile__text">
        <div className="profile__name">{user?.displayName || "사용자 님"}</div>
        <div className="profile__email">{user?.email || "사용자 님"}</div>
      </div>
      <div className="home__tabs">
        <div
          className={`home__tab ${activeTab === "my" && "home__tab--active"}`}
          onClick={() => setActiveTab("my")}
        >
          내가쓴 글(For You)
        </div>
        <div
          className={`home__tab ${activeTab === "like" && "home__tab--active"}`}
          onClick={() => setActiveTab("like")}
        >
          좋아요(Likes)
        </div>
      </div>
      {activeTab === "my" && (
        <div className="post">
          {myPosts?.length > 0 ? (
            myPosts?.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">게시글이 없습니다.</div>
            </div>
          )}
        </div>
      )}
      {activeTab === "like" && (
        <div className="post">
          {likePosts?.length > 0 ? (
            likePosts?.map((post) => <PostBox post={post} key={post?.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">게시글이 없습니다.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
