import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface HamburgerProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}
const Hamburger = ({ isToggle, setIsToggle }: HamburgerProps) => {
  return (
    <>
      <div
        className={isToggle ? "hamburger open" : "hamburger"}
        onClick={() => setIsToggle(!isToggle)}
      >
        <div className="icon"></div>
      </div>
      <div className={isToggle ? "hamburger-menu open" : "hamburger-menu "}>
        <ul className="flex flex-col items-center justify-center gap-y-12">
          <li>
            <Link
              href="/"
              data-text="Home"
              className="h6 hover:text-yellow-primary hover:font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/story"
              data-text="My Story"
              className="h6 hover:text-yellow-primary hover:font-semibold"
            >
              My Story
            </Link>
          </li>
          <li>
            <Link
              href="/signin"
              data-text="Track Your Tag"
              className="h6 hover:text-yellow-primary hover:font-semibold"
            >
              Track Your Tag
            </Link>
          </li>
          <li>
            <Link
              href="/play-now"
              data-text="Play Now!"
              className="font-bold h5 text-green-light hover:text-yellow-primary"
            >
              Play Now!
            </Link>
          </li>
          <li>
            <Link
              href="/contribution"
              data-text="Contribute"
              className="h6 hover:text-yellow-primary hover:font-semibold"
            >
              Contribute
            </Link>
          </li>
          <li>
            <Link
              href="/minions"
              data-text="Contribute"
              className="h6 hover:text-yellow-primary hover:font-semibold"
            >
              State Ambassador
            </Link>
          </li>
          <li>
            <Link
              href="/leaderboard"
              data-text="Leaderboard"
              className="h6 hover:text-yellow-primary hover:font-semibold"
            >
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Hamburger;
