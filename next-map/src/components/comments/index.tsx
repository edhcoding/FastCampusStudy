import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import axios from "axios";
import { CommentApiResponse } from "@/interface";
import { useQuery } from "react-query";
import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentsProps {
  storeId: number;
  searchParamsPage: string;
}

export default function Comments({
  storeId,
  searchParamsPage = "1",
}: CommentsProps) {
  const { status } = useSession();

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${storeId}&limit=5&page=${searchParamsPage}`
    );

    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery(
    `comments-${storeId}-${searchParamsPage}`,
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
        page={searchParamsPage as string}
        totalPage={comments?.totalPage}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
}
