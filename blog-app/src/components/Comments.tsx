import { useContext, useState } from "react";
import { PostProps } from "./PostList";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

const COMMENTS = [
  {
    id: 1,
    email: "test@test.commmmm",
    content: "fdsafasdfsadfasdf",
    createdAt: "2023-99-88",
  },
  {
    id: 2,
    email: "test@test.commmmm",
    content: "fdsafasdfsadfasdf",
    createdAt: "2023-99-88",
  },
  {
    id: 3,
    email: "test@test.commmmm",
    content: "fdsafasdfsadfasdf",
    createdAt: "2023-99-88",
  },
  {
    id: 4,
    email: "test@test.commmmm",
    content: "fdsafasdfsadfasdf",
    createdAt: "2023-99-88",
  },
  {
    id: 5,
    email: "test@test.commmmm",
    content: "fdsafasdfsadfasdf",
    createdAt: "2023-99-88",
  },
  {
    id: 6,
    email: "test@test.commmmm",
    content: "fdsafasdfsadfasdf",
    createdAt: "2023-99-88",
  },
  {
    id: 7,
    email: "test@test.commmmm",
    content: "fdsafasdfsadfasdf",
    createdAt: "2023-99-88",
  },
];

interface CommentsProps {
  post: PostProps;
}

export default function Comments({ post }: CommentsProps) {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commmentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commmentObj), // 원래 코드 comments: commmentObj - 문서에 배열 필드가 포함되어 있으면 arrayUnion() 및 arrayRemove()를 사용해 요소를 추가하거나 삭제할 수 있습니다.
            updatedAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
        }
      }
      toast.success("댓글을 생성했습니다.");
      setComment("");
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          />
        </div>
        <div className="form__block">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {COMMENTS?.map((comment) => (
          <div key={comment.id} className="comment_box">
            <div className="comment__profile-box">
              <div className="comment__email">[comment?.email]</div>
              <div className="comment__date">{comment?.createdAt}</div>
              <div className="comment__delete">삭제</div>
            </div>
            <div className="comment__text">{comment?.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
