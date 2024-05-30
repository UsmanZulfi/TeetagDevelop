import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiBarChartAlt, BiUserVoice } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { GoInbox,GoBrowser } from "react-icons/go";
import {
  HiOutlineAcademicCap,
  HiOutlineShoppingBag,
  HiOutlineViewList,
} from "react-icons/hi";
import { RiDashboardLine, RiUser2Line } from "react-icons/ri";

interface SideBarProps {
  isToggle?: boolean;
}

const Sidebar = ({ isToggle }: SideBarProps) => {
  const router = useRouter();
  const [role, setRole] = useState("");
  useEffect(() => {
    const userRole = getUserInfo()?.role;
    setRole(userRole);
  }, []);

  return (
    <aside className={isToggle ? "sidebar open-sidebar" : "sidebar"}>
      <ul className="flex flex-col justify-center items-stretch">
        <li
          className={
            router.pathname === "/dashboard" ? "dashboard__list_active" : null
          }
        >
          <Link
            href="/dashboard"
            className="flex justify-start items-center gap-4 cursor-pointer"
          >
            <RiDashboardLine />
            <p>Dashboard</p>
          </Link>
        </li>
        {role == "admin" && (
          <>
            {/* users */}
            <li
              className={
                router.pathname.startsWith("/dashboard/users")
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/users"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <FiUsers />
                <p>Users</p>
              </Link>
              {router.pathname.startsWith("/dashboard/users") && (
                <ul className="">
                  <li
                    className={
                      router.pathname === "/dashboard/users"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link href="/dashboard/users" className="cursor-pointer">
                      <p>List</p>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/dashboard/users/analytics"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/users/analytics"
                      className="cursor-pointer"
                    >
                      <p>Analytics</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* minions */}
            <li
              className={
                router.pathname.startsWith("/dashboard/minions")
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/minions"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <RiUser2Line />
                <p>State Ambassadors</p>
              </Link>
              {router.pathname.startsWith("/dashboard/minions") && (
                <ul className="dashboard__list">
                  <li
                    className={
                      router.pathname === "/dashboard/minions"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link href="/dashboard/minions" className="cursor-pointer">
                      <p>List</p>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/dashboard/minions/applications"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/minions/applications"
                      className="cursor-pointer"
                    >
                      <p>Applications</p>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/dashboard/minions/create"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/minions/create"
                      className="cursor-pointer"
                    >
                      <p>Create</p>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/dashboard/minions/analytics"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/minions/analytics"
                      className="cursor-pointer"
                    >
                      <p>Analytics</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* influencers */}
            <li
              className={
                router.pathname.startsWith("/dashboard/influencer")
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/influencer"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <BiUserVoice />
                <p>Influencers</p>
              </Link>
              {router.pathname.startsWith("/dashboard/influencer") && (
                <ul className="dashboard__list">
                  <li
                    className={
                      router.pathname == "/dashboard/influencer"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/influencer"
                      className="cursor-pointer"
                    >
                      <p>List</p>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname ===
                      "/dashboard/influencer/createinfluencer"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/influencer/createinfluencer"
                      className="cursor-pointer"
                    >
                      <p>Create</p>
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/dashboard/influencer/analytics"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/influencer/analytics"
                      className="cursor-pointer"
                    >
                      <p>Analytics</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* scholarship */}
            <li
              className={
                router.pathname.startsWith("/dashboard/scholarship")
                  ? "dashboard__list_active"
                  : "dashboard__list_inactive"
              }
            >
              <Link
                href="/dashboard/scholarship/requested"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <HiOutlineAcademicCap />
                <p>Scholarship</p>
              </Link>
              {router.pathname.startsWith("/dashboard/scholarship") && (
                <ul className="dashboard__list">
                  <li
                    className={
                      router.pathname === "/dashboard/scholarship/requested"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/scholarship/requested"
                      className="cursor-pointer"
                    >
                      <p>Requested</p>
                    </Link>
                  </li>

                  <li
                    className={
                      router.pathname === "/dashboard/scholarship/rejected"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/scholarship/rejected"
                      className="cursor-pointer"
                    >
                      <p>Rejected</p>
                    </Link>
                  </li>

                  <li
                    className={
                      router.pathname == "/dashboard/scholarship/applications"
                        ? "dashboard__list_active"
                        : "dashboard__list_inactive"
                    }
                  >
                    <Link
                      href="/dashboard/scholarship/applications"
                      className="cursor-pointer"
                    >
                      <p>Active/Complete/In-Active</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
        {/* Orders */}
        <li
          className={
            router.pathname === "/dashboard/orders"
              ? "dashboard__list_active"
              : null
          }
        >
          <Link
            href="/dashboard/orders"
            className="flex justify-start items-center gap-4 cursor-pointer"
          >
            <HiOutlineViewList />
            <p>Orders</p>
          </Link>
        </li>

        {/* Payment
        <li
          className={
            router.pathname === "/dashboard/payment"
              ? "dashboard__list_active"
              : null
          }
        >
          <Link
            href="/dashboard/payment"
            className="flex justify-start items-center gap-4 cursor-pointer"
          >
            <MdOutlineAttachMoney />
            <p>Payment/Finance</p>
          </Link>
        </li> */}
        {/* Map */}
        {/* <li
          className={
            router.pathname === "/dashboard/map"
              ? "dashboard__list_active"
              : null
          }
        >
          <Link
            href="/dashboard/map"
            className="flex justify-start items-center gap-4 cursor-pointer"
          >
            <GoLocation />
            <p>Map</p>
          </Link>
        </li> */}
        {/* Email Campaign */}
        {role == "admin" && (
          <>
            <li
              className={
                router.pathname === "/dashboard/email-campaign"
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/email-campaign"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <GoInbox />
                <p>Email Campaign</p>
              </Link>
            </li>

            {/* Settings */}

            <li
              className={
                router.pathname === "/dashboard/settings"
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/settings"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <GoBrowser />
                <p>Settings</p>
              </Link>
            </li>
            <li
              className={
                router.pathname === "/dashboard/prelaunch-users"
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/prelaunch-users"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <HiOutlineShoppingBag />
                <p>Pre Launch Users</p>
              </Link>
            </li>
          </>
        )}
        {/* Influencer Analytics */}
        {role == "influencer" && (
          <>
            <li
              className={
                router.pathname.startsWith("/dashboard/influencer-analytics")
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/influencer-analytics"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <BiBarChartAlt />
                <p>Analytics</p>
              </Link>
            </li>
          </>
        )}
        {role == "minion" && (
          <>
            <li
              className={
                router.pathname.startsWith("/dashboard/minion-analytics")
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/minion-analytics"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <BiBarChartAlt />
                <p>Analytics</p>
              </Link>
            </li>
          </>
        )}
        {role == "user" && (
          <>
            <li
              className={
                router.pathname.startsWith("/dashboard/user-analytics")
                  ? "dashboard__list_active"
                  : null
              }
            >
              <Link
                href="/dashboard/user-analytics"
                className="flex justify-start items-center gap-4 cursor-pointer"
              >
                <BiBarChartAlt />
                <p>Analytics</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
