/**
 * 폰트의 다양한 포맷 (font1 사진)
 * EOT => TTF/OTF => WOFF => WOFF2 순으로 용량이 작습니다.
 * TTF/OTF: 벡터기반의 폰트형식으로 스캐일이 변해도 품질이 유지되며 모든 운영채제에서 지원함
 * WOFF, WOFF2 : 웹 용으로 개발된 압축 폰트형식임, 빠른 다운로드와 효율적인 웹 성능을 제공함
 * EOT: 웹 용으로 마이크로소프트가 개발한 폰트형식임, 주로 IE6에서 사용됨
 *
 * 따라서 용량이 작은 WOFF,WOFF2를 사용할건데 사진에서 보다시피 WOFF2는 최신기술이라 지원을 안하는 운영체제가 있기에 WOFF2를 사용하면서
 * 지원하지 않는 운영체제는 자동으로 WOFF를 사용하게 끔 만들어 볼거임
 *
 *
 *
 * 폰트 적용하는 방법
 * 1. 웹 폰트 서비스 이용
 * ex) <link href="폰트 서비스" />
 * 2. 폰트 다운로드
 * ex) @font-face {font-family: "폰트이름"; src: url("폰트경로");}
 *
 *
 *
 * 웹 폰트 서비스를 이용하는 방법 (Naver font)
 * 1. https://hangeul.naver.com/font
 * 2. 마음에 드는 폰트를 찾는다
 * 3. 웹 폰트 url을 가져온다.
 * 4. 서비스에 적용해본다
 *
 *
 *
 * 폰트 다운로드 방법
 * 다운 받으면 보통 ttf일 경우가 많은데 우리는 WOFF를 사용할거기 때문에 변환사이트 들어가줘야함
 * https://cloudconvert.com/
 */

/**
 * json-server 데이터 가져오기
 * 1. fetch 함수를 이용하여 json-server의 데이터를 가져온다
 * 2. 로딩 상태를 추가하여 로딩 컴포넌트 노출
 * 3. 에러 상태를 추가하여 에러 컴포넌트 노출
 */

/**
 * 웹에서 많이 사용되는 비디오 포맷
 * - MP4 (MPEG-4 Part 14): MP4는 최신 웹 브라우저 대부분과 호환되는 인터넷 친화적인 비디오 포맷입니다.
 * 이 포맷은 품질이 좋고 파일 크기가 작아, 웹에서 동영상을 재생하는데 인기 있는 선택지입니다.
 * - WebM: WebM은 HTML5 비디오 및 오디오 태그와 함께 사용하기 위해 Google이 개발한 비디오 포맷입니다.
 * 고화질 동영상을 손실 없이 효과적으로 압축할 수 있는 고성능 비디오 코덱인 VP8 및 VP9를 지원합니다.
 *
 * 하지만 WebM이 더 좋으나 지원하지 않는 브라우저가 많으므로
 * 우선 WebM 먼저 보여주고 지원하지 않으면 MP4를 보여주도록 할 거임
 *
 *
 *
 *
 * video 태그 (https://developer.mozilla.org/ko/docs/Web/HTML/Element/video)
 *
 * video poster 속성 (https://developer.mozilla.org/ko/docs/Web/HTML/Element/video#attr-poster)
 * 동영상이 로딩 될 때 또는 재생버튼을 누르기 전까지 보여줄 이미지
 *
 * 날짜 라이브러리 date-fns (https://www.npmjs.com/package/date-fns)
 * yarn add date-fns
 *
 *
 *
 * reset css 적용 (https://meyerweb.com/eric/tools/css/reset/) !!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

/**
 * 이미지 갤러리 구현
 *
 * flicking 라이브러리 이용해서 좌우로 넘기는 기능 구현
 * 공식 홈 - https://naver.github.io/egjs-flicking/ko/
 * 깃허브 - https://github.com/naver/egjs-flicking
 *
 *
 * flicking 라이브러리보다 swiper가 더 좋아서 swiper 사용할 거임 (swiper가 더 용량이 작음)
 * swiper 라이브러리 사용(https://v9.swiperjs.com/react#styles)
 * - yarn add swiper@^9 (10버전도 있는데 9버전이 안정화 되어 있어서)
 *
 * 비교차트 (https://npmtrends.com/carousel-vs-egjs-vs-swiper)
 */
