import { StoreDataType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreDataType;
  };

  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId, // enabled가 false 이면 react query를 멈출 수 있음, id 값이 없으면 데이터를 못가져오도록 함
      refetchOnWindowFocus: false, // 기본값 true인데 다른창 넘어갔다 다시 원래 창으로 돌아올때마다 새로고침 되는 현상 막아줌
    }
  );

  const toggleLike = async () => {
    // 찜하기, 찜취소 로직 작성
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id,
        });
        console.log(like);

        if (like.status === 201) {
          toast.success("가게를 찜 했습니다.");
        } else {
          toast.warn("찜을 취소했습니다.");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    } else if (status === "unauthenticated") {
      toast.warn("로그인 후 이용해주세요.");
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {/* 로그인된 사용자가 좋아요를 눌렀다면? */}
      {status === "authenticated" && store?.likes?.length ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
