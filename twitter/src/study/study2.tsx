export default function Study2() {
  return <div>Study2</div>;
}

/**
 * OAuth란?
 * OAuth(Open Authorization): 사용자가 다른 애플리케이션 혹은 서비스의 리소스에 접근할 수 있도록 허용하는 프로토콜
 * OAuth 1.0: 서명된 요청을 통해 사용자 인증 처리. 하지만 복잡하고 사용하기 어려움.
 * OAuth 2.0
 * - 간결한 방식으로 사용자 인증
 * - 클라이언트와 리소스 소유자 사이의 권한 부여 관리
 * - 토큰 기반의 접근 방식 사용
 *
 *
 *
 *
 * OAuth 구성 요소
 * 주요원리 : 사용자의 계정 정보를 안전하게 다른 서비스의 리소스에 접근할 수 있게 하는 것
 * Resouce Owner : 보호된 리소스에 대한 액세스 권한을 가진 사용자 ex) 사용자의 Google 계정은 리소스 오너
 * Client : 리소스에 접근하려는 애플리케이션 / 서비스
 * Authorization Server : 사용자의 인증을 처리하고 클라이언트에게 액세스 토큰 제공
 * Resource Server : 실제로 보호된 리소스를 호스팅하고 있는 서버
 *
 *
 *
 *
 * OAuth 인증 과정
 * 1. 리소스 권한 요청 (Client => Resource Owner)
 * 2. 요청 승인 & 권한 부여 (Resource Owner => Authorization Server)
 * 3. Access Token 발근 (Authorization Server => Clent)
 * 4. Access Token 저장 (Client => Resource Server)
 * 5. 토큰 검증 & 요청 처리 (Resource Server => Client)
 * - 클라이언트 사용자한테 리소스 접근 권한을 요청하게 되는데 사용자는 인증서버를 통해 클라이언트에 요청을 승인하고 권한을 부여함
 * - 인증서버는 클라이언트한테 엑세스 토큰을 발급하고 클라이언트는 엑세스 토큰을 사용해서 리소스 서버에 요청을 보내게 됨
 * - 그리고 리소스 서버는 해당 엑세스 서버를 검증하고 요청을 처리한 결과를 클라이언트에게 반환하게 됨
 *
 *
 *
 *
 * OAuth 장단점
 * - 사용자가 자신의 계정 정보를 외부 애플리케이션에 노출하지 않아도 됨
 * - 보안성 및 사용자 경험 향상. (간편한 로그인 / 회원가입)
 * - 서비스 간에 사용자 정보 공유 X. 각 서비스별 독립성 유지
 * - 하지만, OAuth를 직접 구현하고 관리하는 것은 복잡하고, 보안 이슈가 생길수도 있음
 * - Firebase의 Authentication은 복잡한 OAuth를 편리하게 구현할 수 있도록 도와줌
 */
