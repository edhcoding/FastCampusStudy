import PostHeader from "components/\bposts/Header";
import AuthContext from "context/AuthContext";
import { updateProfile } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const STORAGE_DOWNLOAD_URL_STR = "https://firebasestorage.googleapis.com";

export default function ProfileEdit() {
  const [displayName, setDisplayName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setDisplayName(value);
  };

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();

    fileReader?.readAsDataURL(file);
    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageUrl(result);
    };
  };

  const handleDeleteImage = () => {
    setImageUrl(null);
  };

  const onSubmit = async (e: any) => {
    let key = `${user?.uid}/${uuidv4()}}`;
    const storageRef = ref(storage, key);
    let newImageUrl = null;

    e.preventDefault();

    try {
      // 기존 유저 이미지가 Fireabase storage 이미지일 경우에만 선택, 삭제 - firebase database를 보면 https://firebasestorage.googleapis.com 해당 값이 있는 url은 삭제가 되고 해당 값이 없는 url은 삭제가 안되는 현상이있음
      if (user?.photoURL && user?.photoURL.includes(STORAGE_DOWNLOAD_URL_STR)) {
        const imageRef = ref(storage, user.photoURL);
        if (imageRef) {
          await deleteObject(imageRef).catch((e) => console.log(e));
        }
      }
      // 이미지 업로드
      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, "data_url");
        newImageUrl = await getDownloadURL(data?.ref);
      }
      // updateProfile 호출
      if (user) {
        await updateProfile(user, {
          displayName: displayName || "",
          photoURL: newImageUrl || "",
        })
          .then(() => {
            toast.success("프로필이 업데이트 되었습니다.");
            navigate("/profile");
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL);
    }
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user?.photoURL, user?.displayName]);

  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onSubmit}>
        <div className="post-form__profile">
          <input
            type="text"
            name="displayName"
            className="post-form__input"
            placeholder="이름"
            onChange={onChange}
            value={displayName}
          />
          {imageUrl && (
            <div className="post-form__attachment">
              <img src={imageUrl} alt="attachment" width={100} height={100} />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="post-form__clear-btn"
              >
                삭제
              </button>
            </div>
          )}
          <div className="post-form__submit-area">
            <div className="post-form__image-area">
              <label className="post-form__file" htmlFor="file-input">
                <FiImage className="post-form__file-icon" />
              </label>
            </div>
            <input
              type="file"
              name="file-input"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              type="submit"
              value="프로필 수정"
              className="post-form__submit-btn"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
