import prisma from "@/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") as string;
  const id = searchParams.get("id") as string;
  const district = searchParams.get("district") as string;
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;

  const session = await getServerSession(authOptions);

  if (page) {
    // 페이지네이션
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: q ? { contains: q } : {}, // q가 포함되어 있는지
        address: district ? { contains: district } : {},
      },
      skip: skipPage * 10, // 2. 처음부터 10개 건너뛰고 그다음 11번째부터 보여줘! (offset)
      take: parseInt(limit), // 1. 한 번에 10개 데이터 보여줘! (limit)
    });

    return NextResponse.json(
      {
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10),
      },
      {
        status: 200,
      }
    );
  } else {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {}, // id가 있으면 id가 같은 데이터를 가져오고 그렇지 않으면 where문을 무시하도록 함
      },
      include: {
        likes: {
          where: session ? { userId: session.user.id } : {},
        },
      },
    });

    return NextResponse.json(id ? stores[0] : stores, {
      status: 200,
    });
  }
}

export async function POST(req: Request) {
  const formData = await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address
    )}`,
    { headers }
  );

  const result = await prisma.store.create({
    data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
  });

  return NextResponse.json(result, {
    status: 200,
  });
}

export async function PUT(req: Request) {
  // 데이터 수정을 처리
  const formData = await req.json();
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };

  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
      formData.address
    )}`,
    { headers }
  );

  const result = await prisma.store.update({
    where: { id: formData.id },
    data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
  });

  return NextResponse.json(result, {
    status: 200,
  });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  // 데이터 삭제 처리
  if (id) {
    const result = await prisma.store.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(result, {
      status: 200,
    });
  }
  return NextResponse.json(null, {
    status: 500,
  });
}
