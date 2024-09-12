import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const handleFileUpload = (e: any) => {
    const {
      target: { files }, // file (x) => files (o) 주의!
    } = e;

    // FileReader 객체는 웹 애플리케이션이 비동기적으로 데이터를 읽기 위하여 읽을 파일을 가리키는 File or Blob 객체를 이용해
    // 파일의 내용을 읽고 사용자의 컴퓨터에 저장하는 것을 가능하게 해줌

    // 우리는 FileReader를 통해 이미지를 읽고 해당이미지를 readAsDataUrl() 이라는 메서드를 사용해 이미지를 읽어서 인코딩 된 스트링 데이터를 리턴해줄거임
    // 그리고 데이터를 다 읽었는지 안읽었는지 확인하기 위해서는 FileReader의 loadend event를 사용해줄거임
    // FileReader - https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    // FileReader.readAsDataUrl() - https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsDataURL
    // loadend event - https://developer.mozilla.org/ko/docs/Web/API/FileReader/loadend_event
    const file = files?.[0];
    const fileReader = new FileReader(); // File을 읽기 위한 FileReader 객체 생성
    fileReader?.readAsDataURL(file); // fileReader가 readAsDataUrl 메서드로 파일을 읽어올 수 있도록 해주고 Blob -> base64 data로 변환
    // Blob 객체로 base64의 형태로 변환이 가능하고, 변환된 문자열을 바로 src 로써 사용할 수 있다. 이러한 URL은 보통 data url 이라고 부름
    // blob이란 - 이미지, 오디오, 비디오와 같은 멀티미디어 파일 바이너리를 객체 형태로 저장한 것을 의미한다.
    // base64란 - 바이너리 데이터를 다루기 위해 텍스트(문자열) 형태로 저장한 포맷이라 한다.

    // 파일 읽기가 완료되었을 때 실행되는 이벤트 핸들러
    fileReader.onloadend = (e: any) => {
      // onload VS onloadend 차이는 onload는 성공할때만 실행, onloadend는 실패, 성공 상관없이 실행
      // console.log(e); => 이런 이벤트가 나옴 ProgressEvent {isTrusted: true, lengthComputable: true, loaded: 138124, total: 138124, type: 'loadend', …}
      // 여기서 currentTarget에서 result에 인코딩 된 데이터값이 들어있음
      const { result } = e?.currentTarget;
      setImageFile(result);
    };
  };

  const onSubmit = async (e: any) => {
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`; // 문자열에서 업로드 (study3 참고) (uuid 라이브러리 - 자동 고유 아이디 생성해줌)
    const storageRef = ref(storage, key);
    e.preventDefault();

    try {
      // 이미지 먼저 업로드
      let imageUrl = "";
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, "data_url");
        imageUrl = await getDownloadURL(data?.ref); // https://firebase.google.com/docs/storage/web/download-files?hl=ko&_gl=1*mfmr8w*_up*MQ..*_ga*MjA2MDI5MjYwOS4xNzI2MTI3ODQ4*_ga_CW55HF8NVT*MTcyNjEyNzg0Ny4xLjAuMTcyNjEyNzg0Ny4wLjAuMA..
        // URL을 통해 데이터 다운로드 getDownloadURL - 단순히 url을 공유하려는 경우 스토리지 참조에 getDownloadURL() 메서드를 호출하여 파일의 다운로드 URL을 가져올 수 있음
      }

      // 업로드된 이미지 download url 업데이트
      await addDoc(collection(db, "posts"), {
        // addDoc(collection(db , 컬렉션 이름), {데이터 내용})
        content,
        createdAt: new Date().toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
        imageUrl,
      });
      setTags([]);
      setHashTag("");
      setContent("");
      toast.success("게시글을 성공적으로 생성했습니다.");
      setImageFile(null);
      setIsSubmitting(false);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(new Date()); // Tue Sep 10 2024 14:16:52 GMT+0900 (한국 표준시)
  // console.log(new Date().toLocaleDateString()); // 2024. 9. 10.
  // console.log(
  //   new Date().toLocaleDateString("ko", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   })
  // ); // 2024. 9. 10. 오후 02:18:34

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter((value) => value !== tag));
  };

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };

  const handleKeyUp = (e: any) => {
    if (
      (e.keyCode === 32 || e.keyCode === 13) &&
      e.target.value.trim() !== ""
    ) {
      // keyCode 32는 스페이스바, 13은 엔터,  trim 문자열 좌우 공백 제거
      // 만약 같은 태그라면 에러 발생
      // 아니라면 테그 생성 로직
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="content"
        id="content"
        placeholder="오늘하루 무슨일이 있었나요? (필수 입력)"
        value={content}
        onChange={onChange}
        required
      />
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, i) => (
            <span
              className="post-form__hashtags-tag"
              key={i}
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>
        <input
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
      <div className="post-form__submit-area">
        <div className="post-form__image-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            id="file-input"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {imageFile && (
            <div className="post-form__attachment">
              <img src={imageFile} alt="attachment" width={100} height={100} />
              <button
                type="button"
                className="post-form__clear-btn"
                onClick={handleDeleteImage}
              >
                X
              </button>
            </div>
          )}
        </div>
        <input
          type="submit"
          value="Tweet"
          className="post-form__submit-btn"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
