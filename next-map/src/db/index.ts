import { PrismaClient } from "@prisma/client";

// prismaClientSingleton이라는 함수를 통해 새로운 PrismaClient 인스턴스를 생성하고 반환할 수 있도록 함
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// 이 prismaGlobal 코드 같은 경우에는 객체를 생성하는데 객체 같은 경우 전역 범위에서 Client를 저장하기 위한 용도로 사용이됩니다.
// 이 코드는 개발 환경에서만 사용할 거기 때문에 globalThis를 사용해 전역객체에 접글을 합니다.
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// prisma 해당 변수는 PrismaClient 객체 globalThis의 prismaGlobal의 prisma 객체를 참조하거나 존재하지 않는 경우에는 prismaClientSingleton함수를 호출해 새로운 PrismaClient 인스턴스를 생성합니다
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// 따라서 이렇게 개발 환경에서만 PrismaClient 인스턴스를 전역객체에 할당해서 재사용합니다.
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
