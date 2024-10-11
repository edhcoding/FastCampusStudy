import { getServerSession } from "next-auth";
import prisma from "@/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  const storeId = searchParams.get("storeId") as string;
  const user = searchParams.get("user") as string | boolean;

  const session = await getServerSession(authOptions);

  // 댓글 가져오기
  const skipPage = parseInt(page) - 1;

  const count = await prisma.comment.count({
    where: {
      storeId: storeId ? parseInt(storeId) : {},
      userId: user ? session?.user.id : {},
    },
  });

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      storeId: storeId ? parseInt(storeId) : {},
      userId: user ? session?.user.id : {},
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
    include: {
      user: true,
      store: true,
    },
  });

  return NextResponse.json(
    {
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const formData = await req.json();

  // 댓글 생성 로직
  if (!session?.user) {
    return NextResponse.json({ status: 401 });
  }

  const storeId = formData.get("storeId") as number;
  const body = formData.get("body") as string;

  const comment = await prisma.comment.create({
    data: {
      storeId,
      body,
      userId: session?.user?.id,
    },
  });

  return NextResponse.json(comment, {
    status: 200,
  });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id") as string;

  const session = await getServerSession(authOptions);

  // 댓글 삭제 로직
  if (!session?.user) {
    return NextResponse.json({ status: 401 });
  }

  const result = await prisma.comment.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json(result, {
    status: 200,
  });
}
