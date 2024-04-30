import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getPreLaunchUsers } from "@/website/lib/networkCalls/dashboard/dashboardFunctions";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useEffect, useState } from "react";

const PreLauchUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //api get all users
    const response = getPreLaunchUsers();
    response.then((res) => {
      setUsers(res.result.preLaunchUsers);
    });
  }, []);

  return (
    <div>
      <TitleHead
        title="Pre Launch Users"
        metaTitle="Pre Launch Users"
        metaDesc="Pre Launch Users"
      />
      <InnerHeader title="Pre Launch Users" />
      <div className="mt-12">
        <div className="grid grid-cols-12">
          <p className="col-span-1 text-xl text-green-light font-fugaz font-normal ">
            ID
          </p>
          <p className="col-span-3 text-xl text-green-light font-fugaz font-normal ">
            Email
          </p>
          <p className="col-span-3 text-xl text-green-light font-fugaz font-normal ">
            Phone
          </p>
        </div>
        {users.map((user: any) => (
          <div className=" grid grid-cols-12 mt-3" key={user.id}>
            <p className="col-span-1 text-base text-yellow-primary font-exo font-thin ">
              {user.id}
            </p>
            <p className="col-span-3 text-base text-yellow-primary font-exo font-thin ">
              {user.email}
            </p>
            <p className="col-span-3 text-base text-yellow-primary font-exo font-thin ">
              {user?.phone || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreLauchUsers;

PreLauchUsers.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
