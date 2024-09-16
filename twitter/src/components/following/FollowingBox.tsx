import AuthContext from "context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FollowingProps {
  post: PostProps;
}

export interface UserProps {
  id: string;
}

export default function FollowingBox({ post }: FollowingProps) {
  const [postFollwers, setPostFollwers] = useState<any>([]);

  const { user } = useContext(AuthContext);

  const onClickFollow = async (e: any) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        // 내가 주체가 되어 "팔로잉" 컬렉션 생성 or 업데이트 - updateDoc()이 아닌 setDoc() 사용 (단일 문서를 만들거나 덮어쓸 때 사용 - 문서가 없으면 생성, 있으면 덮어써 기존 문서 업데이트)
        const followingRef = doc(db, "following", user?.uid);

        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: post?.uid }),
          },
          { merge: true }
          // merge - 만약에 지정한 아이디를 가진 문서가 이미 존재한다면, 해당 문서를 덮어쓴다.
          // 기존의 필드를 덮어 씌우지 않기 위해선 merge: true 옵션을 지정해주면 된다
        );
        // 팔로우 당하는 사람이 주체가 되어 "팔로우" 컬렉션 생성 or 업데이트
        const followerRef = doc(db, "follower", post?.uid);

        await setDoc(
          followerRef,
          {
            users: arrayUnion({ id: user?.uid }),
          },
          { merge: true }
        );
        toast.success("팔로우를 했습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickDeleteFollow = async (e: any) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user?.uid);

        await updateDoc(followingRef, {
          users: arrayRemove({ id: post?.uid }),
        });

        const followerRef = doc(db, "follower", post?.uid);

        await updateDoc(followerRef, {
          users: arrayRemove({ id: user?.uid }),
        });
        toast.success("팔로우를 취소 했습니다.");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const getFollowers = useCallback(async () => {
    if (post.uid) {
      const ref = doc(db, "follower", post?.uid);

      onSnapshot(ref, (doc) => {
        setPostFollwers([]);
        doc?.data()?.users?.map(
          (
            user: UserProps // UserProps => id: string에서 id를 가리키는게 아니라 id: user?.uid로 위에 지정해서 id => uid 가리키는 값임
          ) =>
            setPostFollwers((prev: UserProps[]) =>
              prev ? [...prev, user?.id] : []
            )
        );
      });
    }
  }, [post.uid]);

  useEffect(() => {
    // 화면이 처음 마운트 되었을때 해당 게시글의 팔로워들을 모두 뽑는 함수임
    if (post?.uid) {
      getFollowers();
    }
  }, [post?.uid, getFollowers]);

  return (
    <>
      {user?.uid !== post?.uid &&
        (postFollwers?.includes(user?.uid) ? (
          <button
            type="button"
            className="post__following-btn"
            onClick={onClickDeleteFollow}
          >
            Following
          </button>
        ) : (
          <button
            type="button"
            className="post__follow-btn"
            onClick={onClickFollow}
          >
            Follower
          </button>
        ))}
    </>
  );
}
