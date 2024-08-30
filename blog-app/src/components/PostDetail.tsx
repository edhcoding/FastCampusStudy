import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import Loader from "./Loader";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap); 우리가 원하는 포스트에 대한 정보가 있는게 아니라 DocumentSnapshot이라는 obj가 있는데 doc을 확인해보면
      // 바로 가져오는게 아니라 docSnap.data()로 다시 가져와야한다고 되어있음 - console.log(docSnap.data())
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <div className="post__detail">
      {post ? (
        <div className="post__box">
          <div className="post__title">{post.title}</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">{post.email}</div>
            <div className="post__date">{post.createdAt}</div>
          </div>
          <div className="post__utils-box">
            <div
              role="presentation"
              onClick={handleDelete}
              className="post__delete"
            >
              삭제
            </div>
            <div className="post__edit">
              <Link to={`/posts/edit/${post.id}`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text-pre-wrap">{post.content}</div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
