import { Loader } from "@/website/components/Loader/Loader";
import { getUser } from "@/website/lib/networkCalls/authFunctions";
import { User } from "@/website/lib/types/teetagTypes";
import SecondaryLayout from "module/website/layout/SecondaryLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  updateCart,
  updateToken,
  updateUser,
} from "store/features/auth/authSlice";

const Loadingdata = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (router.query.token) {
        dispatch(updateToken(String(router.query.token)));
        const response = await getUser(router.query.token);
        let user: User = response.result.user;
        if (response.status === 200) {
          dispatch(updateUser(user));
          dispatch(updateCart(response.result.user.cart));
          router.replace("/cart");
        } else if (response.status === 401) {
          router.replace("/signin");
        }
      }
    };

    fetchUser();
  }, [router.query.token]);
  return <Loader />;
};

export default Loadingdata;

Loadingdata.getLayout = function (page: React.ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
