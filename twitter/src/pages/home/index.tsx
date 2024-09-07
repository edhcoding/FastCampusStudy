import PostForm from "components/\bposts/PostForm";
import PostBox from "components/\bposts/PostBox";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
  {
    id: "2",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
  {
    id: "3",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
  {
    id: "4",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
  {
    id: "5",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
  {
    id: "6",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
  {
    id: "7",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
  {
    id: "1",
    email: "mephisto7191@naver.com",
    content: "내용입니다.",
    createdAt: "2024-09-06",
    uid: "123123",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
