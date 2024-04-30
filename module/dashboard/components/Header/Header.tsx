import { useAppDispatch } from "@/website/lib/hooks/hooks";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { logout } from "store/features/auth/authSlice";
import { RootState } from "store/store";
import SideBarHamburger from "../SideBarHamburger/SideBarHamburger";
import styles from "./Header.module.css";
const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const userName = getUserInfo()?.name;
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/signin");
  };

  return (
    <header>
      <div className={styles.header}>
        <div className="flex items-center gap-6">
          <SideBarHamburger isToggle={isToggle} setIsToggle={setIsToggle} />
          <Link href="/dashboard" className={styles.logo}>
            <Image
              src="/assets/logo-header.png"
              width={230}
              height={100}
              alt="header-logo"
            />
          </Link>
        </div>
        <div className="flex justify-start items-center gap-6">
          <div className="flex items-center justify-start gap-2 hover:text-yellow-primary cursor-pointer">
            <p className="text-base">{userName}</p>
            <HiOutlineUserCircle className="w-12 h-12 " />
          </div>
          {!user ? (
            <Link href="/signin">
              <BiLogIn className="w-12 h-12 hover:text-yellow-primary" />
            </Link>
          ) : (
            <button onClick={handleLogout}>
              <BiLogOut className="w-12 h-12 hover:text-yellow-primary" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
