import prisma from "@/db";
import { StoreApiResponse, StoreDataType } from "@/interface";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    StoreApiResponse | StoreDataType[] | StoreDataType | null
  >
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;

  if (req.method === "POST") {
    // 데이터 생성 처리
    const formData = req.body;
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

    return res.status(200).json(result);
  } else {
    // GET 요청 처리
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
}
