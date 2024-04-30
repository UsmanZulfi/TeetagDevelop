import { Loader } from "@/website/components/Loader/Loader";
import { NextShield, NextShieldProps } from "next-shield";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export interface Children {
  children: React.ReactNode;
}

export function Shield({ children }: Children) {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const lastPage = localStorage.getItem("lastPage");
  const shieldProps: NextShieldProps<
    [
      "/checkout",
      "/order-tracking",
      "/contribution-order",
      "/contribution-checkout",
      "/verification",
      "/additional",
      "/amazonpay-confirm",
      "/amazonpay-review",
      "/amazonpay-contribution-confirm",
      "/amazonpay-contribution-review",
      "/apply-scholarship",
      "/dashboard",
      "/dashboard/users",
      "/dashboard/analytics",
      "/dashboard/users/[userId]",
      "/dashboard/users/edit/[userId]",
      "/dashboard/minions",
      "/dashboard/minions/analytics",
      "/dashboard/minions/create",
      "/dashboard/minions/[minionId]",
      "/dashboard/minions/edit/[minionId]",
      "/dashboard/minions/applications",
      "/dashboard/minions/application/[applicationId]",
      "/dashboard/influencer",
      "/dashboard/influencer/analytics",
      "/dashboard/influencer/[influencerId]",
      "/dashboard/influencer/edit/[influencerId]",
      "/dashboard/influencer/applications",
      "/dashboard/influencer/createinfluencer",
      "/dashboard/scholarship",
      "/dashboard/scholarship/applications",
      "/dashboard/scholarship/applications/[applicationId]",
      "/dashboard/scholarship/applications/edit/[applicationId]",
      "/dashboard/orders",
      "/dashboard/payment",
      "/dashboard/map",
      typeof lastPage,
    ],
    ["/signin", "/signup", "/forgot-password", "/reset"]
  > = {
    router,
    isAuth: auth.user ? true : false,
    isLoading: auth.loading ? true : false,
    privateRoutes: [
      "/checkout",
      "/order-tracking",
      "/contribution-order",
      "/contribution-checkout",
      "/verification",
      "/additional",
      "/amazonpay-confirm",
      "/amazonpay-review",
      "/amazonpay-contribution-confirm",
      "/amazonpay-contribution-review",
      "/apply-scholarship",
      "/dashboard",
      "/dashboard/users",
      "/dashboard/analytics",
      "/dashboard/users/[userId]",
      "/dashboard/users/edit/[userId]",
      "/dashboard/minions",
      "/dashboard/minions/analytics",
      "/dashboard/minions/create",
      "/dashboard/minions/[minionId]",
      "/dashboard/minions/edit/[minionId]",
      "/dashboard/minions/applications",
      "/dashboard/minions/application/[applicationId]",
      "/dashboard/influencer",
      "/dashboard/influencer/analytics",
      "/dashboard/influencer/[influencerId]",
      "/dashboard/influencer/edit/[influencerId]",
      "/dashboard/influencer/applications",
      "/dashboard/influencer/createinfluencer",
      "/dashboard/scholarship",
      "/dashboard/scholarship/applications",
      "/dashboard/scholarship/applications/[applicationId]",
      "/dashboard/scholarship/applications/edit/[applicationId]",
      "/dashboard/orders",
      "/dashboard/payment",
      "/dashboard/map",
      typeof lastPage,
    ],
    publicRoutes: ["/signin", "/signup", "/forgot-password", "/reset"],
    hybridRoutes: [
      "/",
      "/states/[stateslug],/states/[stateslug]/[productid],/play-now",
      "/tagform",
      "/apply-minion",
      "/bulk-order",
      "/contact-us",
      "/influencer",
      "/minions",
      "order-tracking",
      "/scholarship-recipient",
      "/story",
      "/not-found",
      "/loadingdata",
      "/cart",
    ],
    loginRoute: "/signup",
    accessRoute:
      auth?.user?.role === "admin" ? "/dashboard" : lastPage || "/checkout",
    LoadingComponent: <Loader />,
  };

  return <NextShield {...shieldProps}>{children}</NextShield>;
}
