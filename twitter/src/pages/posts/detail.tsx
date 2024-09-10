import PostBox from "components/\bposts/PostBox";
import Loader from "components/loader/Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef); // 바로 docSnap 호출 하면 안되고 docSnap.data()로 호출해야함

      setPost({ ...(docSnap?.data() as PostProps), id: params.id });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [params.id, getPost]);

  return (
    <div className="post">
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
}
