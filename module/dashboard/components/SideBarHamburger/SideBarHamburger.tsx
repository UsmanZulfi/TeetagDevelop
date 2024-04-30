import { Dispatch, SetStateAction } from "react";
import Sidebar from "../Sidebar/Sidebar";
interface SidBarHamburgerProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}
const SideBarHamburger = ({ isToggle, setIsToggle }: SidBarHamburgerProps) => {
  return (
    <>
      <div
        className={isToggle ? "hamburger-sidebar open" : "hamburger-sidebar"}
        onClick={() => setIsToggle(!isToggle)}
      >
        <div className="icon"></div>
      </div>
      <div className="hide">
        <Sidebar isToggle={isToggle} />
      </div>
    </>
  );
};

export default SideBarHamburger;
