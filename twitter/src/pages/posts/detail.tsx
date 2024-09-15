import PostHeader from "components/\bposts/Header";
import PostBox from "components/\bposts/PostBox";
import CommentBox, { CommentProps } from "components/comments/CommentBox";
import CommentForm from "components/comments/CommentForm";
import Loader from "components/loader/Loader";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);

  const params = useParams();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      // const docSnap = await getDoc(docRef); // 바로 docSnap 호출 하면 안되고 docSnap.data()로 호출해야함 => 없어짐 getDoc하면 새로고침해야 데이터가 불러와지므로 onSnapShot 사용으로 실시간 데이터 패칭하게 만듬

      onSnapshot(docRef, (doc) => {
        setPost({ ...(doc?.data() as PostProps), id: doc?.id });
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [params.id, getPost]);

  return (
    <div className="post">
      <PostHeader />
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
          {post?.comments
            ?.slice(0)
            ?.reverse()
            ?.map((data: CommentProps, i: number) => (
              <CommentBox data={data} post={post} key={i} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
