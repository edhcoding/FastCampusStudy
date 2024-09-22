/**
 * Next.js 데이터 fetching
 *
 * getStaticProps: 정적 페이지 생성을 위한 데이터를 가져오는 사전 렌더링 함수. 런타임이 아닌, 빌드(build) 타임에서만 실행이 되므로,
 * 변동이 거의 없는 데이터 대상으로만 적용하는게 좋음 (예를 들어, 거의 변동이 없는 FAQ 글 목록을 가져올 때 사용됨)
 *
 *
 * getServerSideProps: 서버 사이드 렌더링을 위한 데이터 가져오기 함수.
 * - 매 요청 마다 데이터를 서버에서 가져옴
 * - 자주 업데이트 되는 posts 데이터들을 외부 API로부터 fetch 해서 사전 렌더링 하고 싶을때 사용
 */

/**
 * Prisma란?
 * - Prisma: Node.js 기반의 ORM(Object-Relational Mapping) 도구로, 데이터베이스와의 상호 작용을 단순화하고 개발 생산성을 높이는 데 도움을 주는 도구
 * - SQL 쿼리를 직접 작성하는 대신 자바스크립트 코드로 쿼리를 작성할 수 있게 해주며, 타입 세이프한 쿼리 작성을 통해 런타임 에러를 방지
 * 이점
 * - 타입 세이프 쿼리: 쿼리를 자바스크립트 코드로 작성하므로 타입 에러를 사전에 방지
 * - 자동 마이그레이션: 데이터베이스 스키마 변경을 감지하고 자동으로 마이그레이션을 처리하여 스키마 관 리를 간소화
 * - 강력한 문법: 복잡한 쿼리 및 데이터베이스 관계를 다루기 위한 강력한 문법 제공
 *
 *
 *
 *
 * Prisma 개념 (구성요소)
 * - Prisma Client: Node.js & TypeScript용 쿼리 작성 클라이언트
 * - Prisma Migrate: 마이그레이션 시스템
 * - Prisma Studio: 데이터베이스의 데이터를 보고 편집하는 GUl
 * - 개발자가 직접 SQL문을 작성하지 않아도, 데이터베이스 와 상호작용할 수 있는 ORM
 * - 타 ORM과는 달리, 자체적인 스키마 문법 제공하여 직접 DB 마이그레이션, 클라이언트 코드 생성 등 작업 가능
 * - 위에 언급한 간편한 CLI, Prisma Studio등 편리한 GUl 도구 제공하여 생산성 향상
 *
 *
 *
 *
 * Prisma 기능
 * - Prisma Client: 데이터베이스와 상호 작용하기 위한 자바스크립트 코드를 자동으로 생성해주는 도구
 * - 스키마 정의: 데이터베이스 스키마를 정의하고 관리
 * - DB 마이그레이션: 데이터베이스 스키마 변경을 추적하고 적용할 수 있는 마이그레이션 기능 제공
 * - DB 관계 정의: 복잡한 데이터베이스 관계를 정의 하고 쿼리 기능 제공
 *
 *
 *
 *
 * Prismma 스키마 알아보기 (사진)
 * - 모델 (Model): 모델은 데이터베이스의 특정 테이블 이나 컬렉션과 대응. Prisma에서 모델을 정의하면 해당 모델에 대한 데이터베이스 테이블이나 컬렉션 이 생성됨
 * - 필드 (Field): 모델 내에서 필드는 해당 모델이 가지 필드 는 데이터 속성을 나타냄. 각 필드는 데이터 타입과 제약 조건을 가질 수 있음
 * - 관계 (Relation): Prisma에서 관계는 모델 간의 연 결을 나타냄. 두 테이블 간의 외래키(Foreign Key)를 관리하고 연관된 데이터를 쿼리 가능
 *
 *
 *
 * Prisma 세팅, 문법 (사진)
 * Prisma 설치 후, Prisma Client 인스턴트화 해야함.
 * 세팅
 * 1. Prisma Schema에 generator 정의
 * ex)
 * generator client {
 *  provider = "prisma-clien-js"
 * }
 * 2. prisma/client 패키지 설치 후 prisma 생성
 * yarn add @prisma/client
 * prisma generate
 * 3. Prisma Client를 인스턴스화해서 사용
 * ex)
 * const prisma = new PrismaClient()
 *
 * 문법 CRUD
 * - Prisma로 데이터를 생서앟기 위해서는 create API를 사용
 * ex)
 * const user = await prisma.user.create({
 *  data: {
 *    email: "mephisto@naver.com",
 *    name: "edhcoding",
 *  },
 * })
 * - Prisma로 데이터를 조회하기 위해서는 findMany 또는 findUnique와 같은 메서드 사용
 * (findMany - 해당 조건을 가진 여러가지 데이터를 모두 가지고 올 수 있게함, findUnique - 하나의 데이터만 가지고 올 수 있게함)
 * - where, orderBy, include, select 등의 옵션으로 쿼리 조절 가능
 * ex)
 * const users = await prisma.user.findMany({
 *  where: {
 *    age: {
 *      gte: 18
 *    }
 *  },
 *  orderBy: {
 *    name: "asc"
 *  },
 *  include: {
 *    posts: true
 *  },
 *  select: {
 *    id: true,
 *    name: true
 *  }
 * });
 * - 데이터를 수정하기 위해서 update 메서드 사용
 * (하나만 수정하기 위해서는 update 메서들르 사용하고, 여러 레코드를 한번에 업데이트 하려면 updateMany 사용)
 * ex)
 * const updateUser = await prisma.user.update({
 *  where: {
 *    id: 1
 *  },
 *  data: {
 *    name: "Updated Name"
 *  }
 * })
 * - 데이터를 삭제하기 위해서 delete 메서드 사용
 * (하나만 삭제하기 위해서는 delete 메서드 사용하고, 여러 레코드 삭제를 위해서는 deleteMany 사용)
 * ex)
 * const deletedUser = await prisma.user.delete({
 *  where: {
 *    id: 1
 *  }
 * })
 *
 * const deleteUsers = await prisma.user.deleteMany({
 *  where: {
 *    email: {
 *      contains: "prisma.io",
 *    }
 *  }
 * })
 *
 *
 * 마이그레이션 (사진)
 * - 앞서 작성한 스키마를 DB에 반영하기 위해서는 마이그레이션 명령어를 작성해야함
 * npx prisma migrate dev
 * npx prisma migrate dev --name init
 *
 * - 마이그레이션 된 파일들은 prisma/migration 에 생성됨. 현재 날짜와 시간, 그리고 --name 문자열 조합 (사진)
 * 
 * !!!!!!!! 참고로 마이그레이션 파일들은 직접 수정하면 안됨
 * 마이그레이션 파일 예시 (사진)
 * - 해당 마이그레이션 파일은 직접 수정하면 안됨. 항상 prisma migrate 명령어를 통해서만 파일 생성 / DB 수정을 해야함
 * - 다음과 같은 파일이 만들어지면, 실제 테이블이 DB에도 만들어지며, 데이터 CRUD가 가능해짐
 */
