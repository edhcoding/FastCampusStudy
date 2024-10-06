import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

// next-auth.d.ts 파일을 생성해야 우리가 nextauth에 추가한 id값을 타입으로 설정해서 사용가능함
