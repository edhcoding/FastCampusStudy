import { StoreApiResponse, StoreDataType } from "@/interface";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreDataType[]>
) {
  const { page = "" }: { page?: string } = req.query;
  const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      skip: skipPage * 10, // 2. 처음부터 10개 건너뛰고 그다음 11번째부터 보여줘! (offset)
      take: 10, // 1. 한 번에 10개 데이터 보여줘! (limit)
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
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
    });

    return res.status(200).json(stores);
  }
}
