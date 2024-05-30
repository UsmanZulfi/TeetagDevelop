import { useAppDispatch } from "@/website/lib/hooks/hooks";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { logout } from "store/features/auth/authSlice";
import { RootState } from "store/store";
import Hamburger from "../Hamburger/Hamburger";
import styles from "./Header.module.css";

export const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.auth.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const role = getUserInfo()?.role;
  const [isToggle, setIsToggle] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    localStorage.removeItem("cart");
    localStorage.removeItem("lastPage");
    router.replace("/signin");
  };
  return (
    <>
      <header
        className={isToggle ? styles.header + " header-sticky" : styles.header}
      >
        <div className="container">
          <div className="flex justify-between items-center 2xl:mx-40">
            <div className="">
              <Link href="/" className={styles.logo}>
                <Image
                  src="/assets/logo-header.png"
                  width={140}
                  height={70}
                  alt="header-logo"
                  className="xl:w-72"
                />
              </Link>
            </div>
            <div className="hidden lg:block ">
              <div className="flex justify-center">
                <ul className=" flex items-center justify-start gap-x-8 xl:gap-x-16 ">
                  <li>
                    <Link
                      href="/"
                      data-text="My Story"
                      className={`text-base xl:text-lg hover:text-yellow-primary hover:font-semibold ${
                        router.pathname === "/"
                          ? "text-yellow-primary font-semibold"
                          : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/minions"
                      data-text="Minions"
                      className={`text-base xl:text-lg hover:text-yellow-primary hover:font-semibold ${
                        router.pathname === "/minions"
                          ? "text-yellow-primary font-semibold"
                          : ""
                      }`}
                    >
                      State Ambassadors
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/story"
                      data-text="My Story"
                      className={`text-base xl:text-lg hover:text-yellow-primary hover:font-semibold ${
                        router.pathname === "/story"
                          ? "text-yellow-primary font-semibold"
                          : ""
                      }`}
                    >
                      My Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/play-now"
                      data-text="Play Now!"
                      className={`font-bold h8  hover:text-yellow-primary ${
                        router.pathname === "/play-now"
                          ? "text-yellow-primary font-bold h8"
                          : "text-green-light"
                      }`}
                    >
                      Play Now!
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contribution"
                      data-text="Contribute"
                      className={`text-base xl:text-lg hover:text-yellow-primary hover:font-semibold ${
                        router.pathname === "/contribution"
                          ? "text-yellow-primary font-semibold"
                          : ""
                      }`}
                    >
                      Contribute
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        role != "scholarshipRecipient"
                          ? "/dashboard"
                          : window.location.pathname
                      }
                      data-text="Track Your Tag"
                      className={`text-base xl:text-lg hover:text-yellow-primary hover:font-semibold ${
                        router.pathname === "/dashboard"
                          ? "text-yellow-primary font-semibold"
                          : ""
                      }`}
                    >
                      Track Your Tag
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/leaderboard"
                      data-text="Leaderboard"
                      className={`text-base xl:text-lg hover:text-yellow-primary hover:font-semibold ${
                        router.pathname === "/leaderboard"
                          ? "text-yellow-primary font-semibold"
                          : ""
                      }`}
                    >
                      Leaderboard
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex items-center col-span-6 gap-6 lg:col-span-1 xl:col-start-12 justify-self-end">
                <Link href="/cart" className={styles.cart}>
                  <MdOutlineShoppingCart className="w-12 h-12 hover:text-yellow-primary mt-3" />
                  <div className={styles.counter + " font-fugaz mt-2"}>
                    {cart?.cart_count ?? 0}
                  </div>
                </Link>
                {user === null ? (
                  <Link
                    href="/signin"
                    className="btn-teetag-slim yellow px-12 py-4 ml-6 text-green-light"
                    onClick={() =>
                      localStorage.setItem("lastPage", window.location.pathname)
                    }
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="btn-teetag-slim yellow px-7 py-4"
                  >
                    Logout
                  </button>
                )}
                <Hamburger isToggle={isToggle} setIsToggle={setIsToggle} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
