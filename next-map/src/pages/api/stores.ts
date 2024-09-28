import { StoreApiResponse, StoreDataType } from "@/interface";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreDataType[] | StoreDataType>
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;
  const prisma = new PrismaClient();

  if (page) {
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

    // totalPage, page, data

    // const stores = (await import("../../data/store_data.json"))[
    //   "DATA"
    // ] as StoreDataType[];

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const { id }: { id?: string } = req.query;

    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {}, // id가 있으면 id가 같은 데이터를 가져오고 그렇지 않으면 where문을 무시하도록 함
      },
    });

    return res.status(200).json(id ? stores[0] : stores);
  }
}
