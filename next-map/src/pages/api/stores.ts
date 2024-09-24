import { StoreDataType } from "@/interface";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreDataType[]>
) {
  const prisma = new PrismaClient();
  const stores = await prisma.store.findMany();

  // const stores = (await import("../../data/store_data.json"))[
  //   "DATA"
  // ] as StoreDataType[];

  res.status(200).json(stores);
}
