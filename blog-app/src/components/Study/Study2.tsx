export default function Study2() {
  return <div>study2</div>;
}

/**
 * 게시판 CR(create, read) 구현
 * Firestore란?
 * Firestore: Firebase에서 제공하는 NoSQL 형식의 클라우드 데이터베이스
 * - 애플리케이션 개발을 하다보면 데이터를 저장하고 불러오는 일이 매우 중요한데, Cloud Firestore는 이러한 일을 쉽게 도와줌
 * - Firestore는 실시간 데이터 동기화를 지원하며, 웹, 안드로이드, ios에서 데이터를 저장하고 동기화할 수 있음
 * - 데이터는 문서(document)와 컬렉션(collection)의 형태로 저장되며, 이는 효율적인 쿼리 작성을 가능하게 함
 * - 오프라인 지원 제공
 * 
 * Firestore 장점
 * 1. 실시간 데이터 동기화
 * - 실시간 채팅 및 데이터 분석 등 실시간 기능 애플리케이션 개발
 * 2. 구조화된 데이터
 * - 문서 - 컬렉션 형태로 데이터 저장 / 구조화된 데이터 쉽게 저장하고 불러올 수 있음
 * 3. 보안
 * - 사용자 기반의 보안규칙 설정 가능
 * 
 * Firestore 사용예시
 * 1. 다양한 유형의 애플리케이션에 사용 ex) 실시간 채팅 앱
 * 2. 다양한 데이터 저장 및 불러올 수 있음 ex) 게임 점수, 사용자 설정, 텍스트, 이미지
 * 3. 사용자별 데이터 접근 권환 관리
 * - 사용자 인증 정보와 함께 사용됨
 * 
 * 사용법
 * 1. Firebase 프로젝트 생성 & Firebase SDK 앱 추가
 * 2. Firestore 인스턴스 가져오기 - getFirestore
 * 3. Firebase 서비스 사용하기
 * 
 * 보안규칙
 * https://firebase.google.com/docs/rules/get-started?hl=ko&authuser=0&_gl=1*s44exs*_ga*MTc5MTAyMzQwOS4xNzIyMTYzMzEz*_ga_CW55HF8NVT*MTcyNDA5MzQwMS4xMS4xLjE3MjQwOTM1MzkuNTEuMC4w
 * 
 * 
 */
