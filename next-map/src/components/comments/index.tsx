import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import axios from "axios";
import { CommentApiResponse } from "@/interface";
import { useQuery } from "react-query";
import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentsProps {
  storeId: number;
  params?: {
    page?: string;
  };
}

export default function Comments({ storeId, params }: CommentsProps) {
  const { status } = useSession();

  const page = params?.page || "1";

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${storeId}&limit=5&page=${page}`
    );

    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery(
    `comments-${storeId}-${page}`,
    fetchComments
  );

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {/* comment form */}
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      {/* comment list */}
      <CommentList comments={comments} />
      {/* pagination */}
      <Pagination
        page={page as string}
        totalPage={comments?.totalPage}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
}
