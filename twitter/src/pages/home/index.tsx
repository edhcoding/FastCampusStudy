import PostForm from "components/\bposts/PostForm";
import PostBox from "components/\bposts/PostBox";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "context/AuthContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { UserProps } from "components/following/FollowingBox";
import useTranslation from "components/hooks/useTranslation";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
  hashTags?: string[];
  imageUrl?: string;
}

type TabType = "all" | "following";

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([""]);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const { user } = useContext(AuthContext);

  const t = useTranslation();

  // 실시간 동기화로 user의 팔로잉 id 배열 가져오기
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, "following", user?.uid);

      onSnapshot(ref, (doc) => {
        setFollowingIds([""]);

        doc
          ?.data()
          ?.users.map((user: UserProps) =>
            setFollowingIds((prev: string[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc")); // 비교할 때는 get메서드, 정렬(오름, 내림 차순)할 때는 orderBy
      let followingQuery = query(
        postsRef,
        where("uid", "in", followingIds), // in 같은 경우에는 배열안에 아무값도 없으면 안되기 때문에 followingIds 초기값으로 [] => [""] 이렇게 넣어줌
        orderBy("createdAt", "desc")
      );

      onSnapshot(postsQuery, (snapshot) => {
        // 실시간 데이터 업데이트 onSnapShot
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });

      onSnapshot(followingQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollowingPosts(dataObj as PostProps[]);
      });
    }
  }, [user, followingIds]);

  useEffect(() => {
    if (user?.uid) {
      getFollowingIds();
    }
  }, [user?.uid, getFollowingIds]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">{t("MENU_HOME")}</div>
        <div className="home__tabs">
          <div
            className={`home__tab ${
              activeTab === "all" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("all")}
          >
            {t("TAB_ALL")}
          </div>
          <div
            className={`home__tab ${
              activeTab === "following" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("following")}
          >
            {t("TAB_FOLLOWING")}
          </div>
        </div>
      </div>
      <PostForm />
      {activeTab === "all" && (
        <div className="post">
          {posts?.length > 0 ? (
            posts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{t("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
      {activeTab === "following" && (
        <div className="post">
          {followingPosts?.length > 0 ? (
            followingPosts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{t("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
