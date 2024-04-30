import Heading from "@/website/components/Heading/Heading";
import LoaderTransparent from "@/website/components/LoaderTransparent/LoaderTransparent";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import {
  getUser,
  handleStatus,
  sendPhoneOtp,
  verifyPhoneOtp,
} from "@/website/lib/networkCalls/authFunctions";
import { User } from "@/website/lib/types/teetagTypes";
import SecondaryLayout from "module/website/layout/SecondaryLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { updateUser } from "store/features/auth/authSlice";
import { RootState } from "store/store";

const maxLength = 4;

const Verification = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  // const [emailOtp, setEmailOtp] = useState<string>("");
  const [phoneOtp, setPhoneOtp] = useState<string>("");

  function handleVerify() {
    if (!user?.to_verify) {
      router.replace("/cart");
    } else {
      toast.error("Please complete verification");
    }
  }
  // useEffect(() => {
  //   const EmailOtp = async () => {
  //     if (emailOtp.length >= maxLength) {
  //       setLoader(true);
  //       const response = await verifyEmailOtp(emailOtp);
  //       handleStatus(response);
  //       if (response.status === 200) {
  //         const userResponse = await getUser(token);
  //         const user: User = userResponse.result.user;
  //         dispatch(updateUser(user));
  //         setLoader(false);
  //         setEmailOtp("");
  //       } else {
  //         setLoader(false);
  //       }
  //     }
  //   };
  //   EmailOtp();
  // }, [emailOtp]);

  useEffect(() => {
    const PhoneOtp = async () => {
      if (phoneOtp.length >= maxLength) {
        setLoader(true);
        const response = await verifyPhoneOtp(phoneOtp);
        handleStatus(response);
        if (response.status === 200) {
          const userResponse = await getUser(token);
          const user: User = userResponse.result.user;
          dispatch(updateUser(user));
          setLoader(false);
          setPhoneOtp("");
        } else {
          setLoader(false);
        }
      }
    };
    PhoneOtp();
  }, [phoneOtp]);

  const handleCode = async (
    e: React.MouseEvent<Element, MouseEvent>,
    type: string,
  ) => {
    if (type === "phone") {
      setLoader(true);
      const response = await sendPhoneOtp();
      handleStatus(response);
      setLoader(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    if (value.length <= maxLength) {
      if (event.target.name === "phoneOtp") {
        setPhoneOtp(value);
      }
    }
  };

  return (
    <>
      {loader && <LoaderTransparent />}
      <Toaster />
      <TitleHead
        title="Verify Your Account"
        metaTitle="Verify Your Account"
        metaDesc=""
      />
      <div className="container">
        <div className="verification__box">
          <Heading title="Verification" />
          <p className="h7 text-center mb-10">
            Before to continue. Please verify your identity
          </p>
          {/* <div className="flex justify-between gap-10 mb-8">
            <div className="flex items-center gap-10">
              <p className="h8 text-green-light font-fugaz ">
                Email Verification
              </p>
              <Image
                src={
                  user?.email_verified
                    ? "/assets/check.png"
                    : "/assets/false.png"
                }
                width={22}
                height={22}
                alt=""
              />
            </div>
            <div>
              {!user?.email_verified && (
                <button
                  type="button"
                  className="hover:text-yellow-primary"
                  onClick={(e) => handleCode(e, "email")}
                >
                  Resend Code
                </button>
              )}
            </div>
          </div> */}
          {/* {!user?.email_verified && (
            <div className="teetag__input mb-12">
              <label
                htmlFor="emailOtp"
                className="block mb-4 capitalize font-fugaz"
              >
                Enter Code
              </label>
              <input
                type="number"
                name="emailOtp"
                id="emailOtp"
                value={emailOtp}
                placeholder="Enter 4 digit Code"
                onChange={handleInputChange}
              />
            </div>
          )} */}
          <div className="flex items-center justify-between  mb-8">
            <div className="flex items-center gap-10">
              <p className="h8 text-green-light font-fugaz ">
                Phone Verification
              </p>
              <Image
                src={
                  user?.phone_verified
                    ? "/assets/check.png"
                    : "/assets/false.png"
                }
                width={22}
                height={22}
                alt=""
              />
            </div>
            <div>
              {!user?.phone_verified && (
                <button
                  type="button"
                  className="hover:text-green-dark"
                  onClick={(e) => handleCode(e, "phone")}
                >
                  Resend Code
                </button>
              )}
            </div>
          </div>
          {!user?.phone_verified && (
            <div className="teetag__input mb-6">
              <label
                htmlFor="phoneOtp"
                className="block mb-4 capitalize font-fugaz"
              >
                Enter Code
              </label>
              <input
                type="number"
                name="phoneOtp"
                id="phoneOtp"
                value={phoneOtp}
                placeholder="Enter 4 digit Code"
                onChange={handleInputChange}
              />
            </div>
          )}
          <button
            type="button"
            onClick={handleVerify}
            className="btn-teetag yellow w-full text-center"
          >
            Continue
          </button>

          <Link
            href="/"
            className="flex justify-center items-center gap-5 mt-20 text-xl text-center hover:text-green-light"
          >
            <Image
              src="/assets/left_arrow.png"
              width={24}
              height={24}
              alt="left_arrow"
            />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Verification;

Verification.getLayout = function (page: React.ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
