import { getServerSession } from "next-auth";
import prisma from "@/db";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ status: 401 });
  }

  // GET 요청 처리
  const count = await prisma.like.count({
    where: {
      userId: session.user.id,
    },
  });

  const skipPage = parseInt(page) - 1;

  const likes = await prisma.like.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      userId: session.user.id,
    },
    include: {
      // 우리는 like 데이터만 필요한게 아니라 like 데이터에 연결되어있는 store 데이터도 함께 필요함
      store: true, // 찜한 리스트 목록 데이터 리스트로 보여줘야 함
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
  });

  return NextResponse.json(
    {
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    },
    {
      status: 200,
    }
  );
}

export async function POST(req: Request) {
  const { storeId } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 찜하기 로직 처리
  // Like 데이터가 있는지 확인
  let like = await prisma.like.findFirst({
    where: {
      storeId,
      userId: session?.user?.id,
    },
  });

  // 만약 이미 찜을 했다면, 해당 like 데이터 삭제. 아니라면, 데이터 생성
  if (like) {
    // 이미 찜을 한 상황
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return new NextResponse(null, {
      // 204 상태 코드를 반환할 때 NextResponse.json()을 사용하지 않고, NextResponse를 사용하여 빈 응답을 반환해야 합니다.
      status: 204,
    });
  } else {
    const userId = session?.user?.id;

    // 찜을 하지 않은 상황
    like = await prisma.like.create({
      data: {
        storeId,
        userId,
      },
    });

    return NextResponse.json(like, {
      status: 201,
    });
  }
}
