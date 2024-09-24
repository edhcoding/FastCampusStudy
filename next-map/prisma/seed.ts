import { PrismaClient } from "@prisma/client";
// import data from "../src/data/store_data.json"; // @골뱅이로 import하면 안됨

const prisma = new PrismaClient();

// async function seedData() {
// data?.["DATA"]?.map(async (store) => {
//   const storeData = {
//     phone: store?.tel_no,
//     address: store?.rdn_code_nm,
//     lat: store?.y_dnts,
//     lng: store?.x_cnts,
//     name: store?.upso_nm,
//     category: store?.bizcnd_code_nm,
//     storeType: store?.cob_code_nm,
//     foodCertifyName: store?.crtfc_gbn_nm,
//   };

//   const res = await prisma.store.create({
//     data: storeData,
//   });
//   console.log(res);
// });
// }

async function main() {
  // await seedData();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1); // 수동 프로세스 종료 (이 줄을 만나면 즉시 종료)
  })
  .finally(() => {
    // $disconnect() 메서드는 데이터베이스 연결 해제 작업을 수행하는 prisma 의 내부 메서드로서, $ 접두사가 해당 메서드가 prisma 내부 동작을 나타내는 것임을 알려준다
    prisma.$disconnect();
  });
