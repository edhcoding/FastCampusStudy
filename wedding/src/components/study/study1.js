/**
 * REST 란
 * - REST는 웹의 기본 프로토콜인 HTTP를 기반으로 구현되며, HTTP 메서드와 URL을 이용하여 자원과 하고자하는 행동을 표현합니다.
 * - REST API는 REST 한 방식으로 설계된 API 입니다.
 * - REST API는 웹 서비스에서 가장 널리 사용되는 아키텍쳐 스타일 중 하나 입니다.
 * 
 * 
 * REST API 란
 * - 서버의 HTTP 메서드를 사용하여 CRUD (Create, Read, Update, Delete) 연산을 수행합니다. 리소스는 URL로 식별할 수 있습니다.
 * - URL은 어떤 자원에 접근할 것인지, 메소드는 어떤 행동을 할지에 대한 규칙을 가지고 있기 때문에 리소스와 하고자하는 행동을 한눈에 파악하기 쉽습니다
 * ex) (GET) http://example.com/wedding = 모든 청첩장을 가져옵니다
 * ex) (GET) http://example.com/wedding/1 = 1번 id 를 가진 청첩장을 가져옵니다.
 * 
 * 
 * 
 * JSON Server
 * - Json Server 는 JSON 파일을 이용하여 Rest API 서버를 빠르고 간단하게 생성하기 위한 도구입니다.
 * - Json server 를 이용하면 JSON 파일을 데이터베이스처럼 동작하게 할 수 있고, HTTP
 * 메서드를 활용하여 데이터에 접근하고 수정 할 수 있는 api 를 만들 수 있습니다.
 * - https://github.com/typicode/json-server
 * - https://github.com/typicode/json-server/tree/v0 이게 더 자세한거 같음
 * 
 * 
 * 
 * 
 * JSON Server 설치
 * - -g 글로벌로 설치하면 컴퓨터 용량도 먹고 안좋음 현재 프로젝트에서는 -D 데브데펜던시로 설치할거임
 * - yarn add -D json-server
 * 
 * - 최상위 루트에 db.json 파일 생성하고 초기값으로는 홈페이지 값 넣어줌
 * - 실행해야하므로 package.json script에다가 "dev:db": "json-server db.json --watch --port=8888" 넣어줌
 * 포트는 다르게 넣어줌 CRA dev port랑 겹치므로 8888로 넣어줌
 * watch 옵션을 꼭 넣어줘야함 아니면 db.json을 중간에 수정하면 바로바로 반영안돼서 껏따 다시 dev:db 해야함 (실시간 동기화 느낌)
 */
