import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>("");

  const { user } = useContext(AuthContext);

  const handleFileUpload = () => {};

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        // addDoc(collection(db , 컬렉션 이름), {데이터 내용})
        content,
        createdAt: new Date().toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
      });
      setTags([]);
      setHashTag("");
      setContent("");
      toast.success("게시글을 성공적으로 생성했습니다.");
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

  const removeTag = (tag: string) => {
    setTags(tags?.filter((value) => value !== tag));
  };

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };

  const handleKeyUp = (e: any) => {
    if (
      (e.keyCode === 32 || e.keyCode === 13) &&
      e.target.value.trim() !== ""
    ) {
      // keyCode 32는 스페이스바, 13은 엔터,  trim 문자열 좌우 공백 제거
      // 만약 같은 태그라면 에러 발생
      // 아니라면 테그 생성 로직
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        placeholder="오늘하루 무슨일이 있었나요? (필수 입력)"
        value={content}
        onChange={onChange}
        required
      />
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, i) => (
            <span
              className="post-form__hashtags-tag"
              key={i}
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>
        <input
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
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
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
