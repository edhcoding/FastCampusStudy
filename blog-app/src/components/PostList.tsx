import AuthContext from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
  comments?: CommentsInterface[];
}

type TabType = "all" | "my";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  // hasNavigation - list page 에서는 보여야 하고 profile page 에서는 보이면 안됨
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    // const datas = await getDocs(collection(db, "posts"));

    setPosts([]); // 삭제해도 계속 늘어나는 이유가 삭제한 자리에 데이터가 남아있기에 빈 배열로 초기화를 안시켜줘서 그럼

    // 데이터가 순서데로 안나와서 쿼리 데이터 정렬을 이용해 데이터 정렬함
    let postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      // 나의 글만 필터링
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );
      // where는 기준을 정할 때 사용 ex) const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));
      // post의 uid가 내 uid랑 같으면 필터링
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // 복합 쿼리를 사용했으므로 firebase에서 카테고리 인덱스를 추가해줘야함
      // 에러나옴 - The query requires an index.
    } else if (activeTab === "all") {
      // 모든 글 보여주기
      postsQuery = query(postsRef, orderBy("createdAt", "asc")); // asc(ascending) - 오름차순, desc(descending) - 내림차순
    } else {
      // 카테고리 글 보여주기
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc")
      );
    }

    const datas = await getDocs(postsQuery);

    datas?.forEach((doc) => {
      // forEach 배열 하나씩 돔
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제하였습니다.");
      getPosts(); // 변경된 post 리스트를 다시 가져오도록 하겠음
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
          {CATEGORIES.map((category) => (
            <div
              key={category}
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
            >
              {category}
            </div>
          ))}
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>
              {post?.uid === user?.uid && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
