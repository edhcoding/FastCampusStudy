/**
 * react-hook-form이란?
 * - React-hook-form: 리액트 앱에서 폼 관리를 단순하고 효율적으로 할 수 있도록 도와주는 라이브러리
 * - 리액트의 훅을 사용하여 강력한 폼 처리 기능을 제공하며, 복잡한 폼 로직을 간단하게 구현(공식 문서 참고: https://www.react-hook-form.com/)
 * - 성능 최적화: 렌더링을 최적화 시켜서 성능을 향상시킴. Ex) 폼 필드 변경되면, 변경된 필드만 다시 렌더링
 * - 간편한 상태 관리: 기존 폼 관리에 비해 간단함. 따로 상태 관리 컴포넌트 및 변수 생성 X
 * - 유효성 검사 및 에러 처리: 폼 유효성 검사 및 에러처리를 쉽게 처리할 수 있는 훅 지원 (useForm)
 * - 다양한 입력 유형: 텍스트 입력부터 체크박스, 라디오 버튼, 선택 목록 등 다양한 입력 유형을 지원
 *
 *
 *
 *
 * react-hook-form 예시 (TS) (form1 사진)
 * const { register, handleSybmit, watch, formState: { errors } } = useForm();
 * register - form input을 등록하는 함수로 입력 필드랑 react-hook-form을 연결하는 역할을 함
 * handleSubmit - 폼 제출 이벤트를 처리하는 함수, 입력할 때 유효성 검사를 수행하고 만약에 유효성 검사를 통과가 되었을때 handleSubmit 함수를 실행함
 * watch - 입력필드의 값을 모니터링 하는 함수로 입력 필드의 이름을 전달하면 해당 필드의 현재 값을 확인할 수 있음
 * formState: {errors} - 폼 상태 객체에서 에러속성을 추출해서 유효성 검사 에러 메세지를 저장하는데 사용
 *
 * <input defaultValue="test" {...register("example")}; defaultValue 속성은 초깃값 지정
 * <input {...register("exampleRequired", { required: true })}; required true 속성을 사용해서 필수값을 지정가능함
 * {errors.exampleRequired && <div>this field required</div>} errors에 exampleRequired가 있다면 <div></div>가 나오게함
 * fomt 태그 안에 마지막에는 <input type="submit" /> 을 지정해줘야 form onSubmit={handleSubmit(onSubmit)}이 실행됨
 *
 *
 *
 *
 * react-hook-form 주요기능
 * react-hook-form은 폼을 쉽게 관리할 수 있는 다양한 기능을 지원함
 * - 폼 등록(Form Registering): 각 입력 필드를 등록하고, 해당 필드의 상태와 유효성 검사 규칙을 정의
 * - 값 추적(Value Tracking): 입력 필드의 값 변경을 추적하고, 이를 커스텀 로직에 활용
 * - 유효성 검사(Validation): 입력 필드에 대한 유효성 검사를 쉽게 설정하고 에러 메시지를 처리
 * - 폼 제출(Form Submission): 폼 제출 시 입력 값들을 쉽게 얻을 수 있으며, 필요한 로직을 수행
 *
 *
 *
 *
 * 주요 기능 예제
 * 1. 폼 등록(Form Registering): register 함수를 사용하여 각 입력 필드를 폼에 등록
 * - 등록 시, 각 필드에 대한 유효성 검사 규칙(validation rules)을 정의할 수 있음
 * <input {...register("username", { required: true, minLength: 6 })} />
 *
 * 2. 값 추적(Value Tracking): watch 함수를 사용하여 입력 필드의 현재 값을 추적
 * - 이를 활용하여 필드 간 상호 작용이나 커스텀 로직 구현 가능
 * const usernameValue = watch("username");
 *
 * 3. 유효성 검사(Validation): register 함수를 통해 정의한 유효성 검사 규칙에 따라 입력 필드의 값이 유효한지 자동으로 검사
 * - 유효성 검사 실패 시 , errors 객체를 통해 해당 필드에 대한 오류 메시지 얻을 수 있음
 * {errors.username && <div>두 글자 이상으로 입력해주세요</div>}
 *
 * 4. 폼 제출(Form Submission): handleSubmit 함수를 사용하여 폼 제출을 처리
 * - 이 함수는 폼 유효성 검사를 수행하, 검사가 통과되면 제출 핸들러 함수를 호출
 * const onSubmit = (data) => {
 *  // 입력 값 (data)을 사용하여 로직 수행
 * }
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 * <폼 필드들>
 * <input {...register("username", { required: true, minLength: 6 })} />
 * <...>
 * <input type="submit" />
 * </form>
 *
 *
 * 설치방법 (https://www.react-hook-form.com/get-started/)
 * yarn add react-hook-form
 *
 *
 *
 * react-hook-form 장단점
 * - 성능 최적화: 필요한 컴포넌트만 다시 렌더링되므로, 큰 폼이나 복잡한 폼에서도 좋은 성능을 제
 * - 생산성 향상 (편리함): register, watch, handleSubmit 등의 함수를 사용하여 복잡한 폼 로직을 구현
 * - 유효성 검사: 유효성 검사 규칙을 간단하게 설정하고, 오류 메시지를 처리할 수 있음
 * - 상태 관리: 필드의 상태를 관리하며, 폼 데이터를 관리하기 위한 별도의 상태 관리 라이브러리 필요 없음
 * - 커스터마이징: 다양한 폼 요소와 라이브러리와 쉽게 통합됨
 *
 * - 학습 필요: 초기 학습 곡선이 다소 가파를 수 있으며, 문서화가 완벽하지 않을 수 있음
 * - 비제어 컴포넌트: 비제어 컴포넌트를 사용하기 때문에, React의 일관된 상태 관리 패턴을 따르지 않음
 *
 *
 * 참고 사이트
 * - 폼 레이아웃 (tailwind ui) - https://tailwindui.com/components/application-ui/forms/form-layouts
 */

/**
 * Recoil 중복된 atom key 이슈 (https://recoiljs.org/ko/docs/api-reference/core/RecoilEnv/)
 * - 이슈 개요: next dev를 사용해서 프로젝트를 실행하면, Duplicate atom key "map"! This is a FATAL ERROR in production. But it is safe to ignore this warning if it occurred because of hot module replacement. 라는 에러 메세지가 콘솔에 출력됨
 * - 이슈 원인: Next.js 개발 중 파일이 변경되면 다시 빌드되는 과정에서 atom으로 만든 state가 재선언되 는데, 재선언되는 과정에서 이미 key로 선언된 값을 다시 사용해서 문제가 발생
 * - 해결방법:.env 환경 변수 파일에 아래 코드 추가 (0.7.6 버전 이상에서 사용 가능)
 * (RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false)
 * - 해결방법 2: 문제가 되는 key 값에 uuid() 라이브러리를 활용해서 난수 추가
 */
