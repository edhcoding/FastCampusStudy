/**
 * Next-auth란? (https://next-auth.js.org/)
 * - Next-auth: Next.js 애플리케이션에서 간단하고 확장 가능한 사용자 인증을 구현하기 위한 라이브러리
 * * 여러 인증 공급자 (Googel, Facebook, GitHub 등)와 함께 작동
 * * 세션 기반 및 JWT (JSON Web Tokens) 기반의 인증을 지원
 * - 다양한 인증 공급자를 통한 손쉬운 로그인 (Googel, Facebook, GitHub, 이메일 및 기타)
 * - 세션과 JWT를 사용한 사용자 인증 관리
 * - 사용자 데이터베이스 통합 및 사용자 정의 프로필 필드 관리
 * - 보안적으로 안전한 사용자 인증을 위한 설정 및 옵션
 *
 *
 * 코드예시 (auth1 사진)
 *
 *
 *
 *
 * Next-auth 장점
 * - 간단한 설정: 직접 구현하는 것에 비해 인증 설정이 매우 간단
 * - 다양한 인증 공급자: Google, Facebook,Apple, Naver, Kakao 등 수십개의 인증 공급자 통합 가능
 * - 안전한 보안: 보안 관련 작업 (세션 관리, JWT 생성, CSRF 방어 등) 자동 처리
 * - 확장성: 사용자 데이터베이스와의 통합을 지원
 * - Next.js Next js SSR(Server Side Rendering) # CSR(Client Side Rendering)에서 원활하게 작동
 *
 *
 *
 *
 * Next-auth 사용자 인증 방식 (+ callback) (auth2 사진)
 * - NextAuth.js는 주로 세션과 JWT를 함께 사용해서 인증 작업 진행(개발자는 프로젝트 요구 상항에 따라 적절한 방식을 선택할 수 있음)
 * - 또한, NextAuth.js는 다양한 콜백 함수를 사용해서 사용자 인증 및 세션 관리 조정 가능
 *
 *
 *
 *
 * JWT 와 Session 방식이란?
 * - JWT (JSON Web Tokens)와 세션은 사용자 인증 및 권한 부여에 사용되는 두 가지 주요 방식
 * - JWT: Json Web Token의 약자로, Json 포맷을 이용해 인증에 필요한 정보를 암호화 한 웹 토큰
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey
 * JzdWIiOiIxMjMONTY30DkwIiwibmFtZSI6Ikpva
 * G4gRG91TiwiaWF0IjoxNTE2MjM5MDIyfQ.Sf1Kx
 * wRJSMeKKF2QT4fwMeJf36P0k6yJV_adQssw5c
 * - 세션(Session): 웹 애플리케이션에서 사용자의 상태 정보를 저장하고 관리하기 위한 방식 중 하나
 * (세션은 사용자가 웹 서비스와 상호작용할 때 생성되며, 사용자의 상태 정보를 서버 측에 저장)
 *
 *
 *
 * JWT VS Session 차이 (auth3 사진)
 * 
 * 
 * 
 * 
 * Nexxt-auth & Prisma 같이 사용하기 (auth4 사진)
 * - https://authjs.dev/reference/adapter/prisma
 * - Prisma Adapter를 사용해, Next-auth로 회원가입을 하면 유저 정보를 prisma로 저장
 */
