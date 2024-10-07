import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";

interface CommentsProps {
  storeId: number;
}

export default function Comments({ storeId }: CommentsProps) {
  const { status } = useSession();

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {/* comment form */}
      {status === "authenticated" && <CommentForm storeId={storeId} />}
      {/* comment list */}
    </div>
  );
}
