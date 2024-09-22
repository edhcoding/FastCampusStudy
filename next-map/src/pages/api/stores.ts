import { StoreDataType } from "@/interface";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreDataType[]>
) {
  const stores = (await import("../../data/store_data.json"))[
    "DATA"
  ] as StoreDataType[];

  res.status(200).json(stores);
}
