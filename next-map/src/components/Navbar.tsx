import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { status } = useSession();

  return (
    <>
      <div className="navbar">
        <Link href="/" className="navbar__logo">
          Next-map
        </Link>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한가계
          </Link>
          <Link href="/users/mypage" className="navbar__list--item">
            마이페이지
          </Link>
          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
        <div
          role="presentation"
          className="navbar__button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/* mobile button */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link
              href="/stores"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 목록
            </Link>
            <Link
              href="/stores/new"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              맛집 등록
            </Link>
            <Link
              href="/users/likes"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              찜한가계
            </Link>
            <Link
              href="/users/mypage"
              className="navbar__list--item--mobile"
              onClick={() => setIsOpen(false)}
            >
              마이페이지
            </Link>
            {status === "authenticated" ? (
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="navbar__list--item--mobile"
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="navbar__list--item--mobile"
                onClick={() => setIsOpen(false)}
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
