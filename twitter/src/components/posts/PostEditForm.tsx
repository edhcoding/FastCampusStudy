import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostEditForm() {
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostProps | null>(null);

  const params = useParams();

  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    // useCallback은 원하는 타이밍에 호출시킬 함수를 만들기 위해 사용(함수가 반환됨)
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);

  const handleFileUpload = () => {};

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content,
        });

        navigate(`/posts/${post?.id}`);
        toast.success("게시글을 성공적으로 수정했습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(new Date()); // Tue Sep 10 2024 14:16:52 GMT+0900 (한국 표준시)
  // console.log(new Date().toLocaleDateString()); // 2024. 9. 10.
  // console.log(
  //   new Date().toLocaleDateString("ko", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   })
  // ); // 2024. 9. 10. 오후 02:18:34

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [params.id, getPost]);

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        value={content}
        onChange={onChange}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
