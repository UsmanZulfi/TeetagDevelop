import axios from "axios";
import { NextRouter } from "next/router";
import { toast } from "react-hot-toast";
import { stateOptions } from "../types/common";
import { ApiResponse, CartApiResponse } from "../types/teetagTypes";

export const sendPhoneOtp = async (): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/user/send-phone-otp",
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const sendEmailOtp = async (): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/user/send-email-otp",
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const verifyEmailOtp = async (otp: string): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      otp,
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/user/verify-email",
      data,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const verifyPhoneOtp = async (otp: string): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      otp,
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/user/verify-phone",
      data,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const sendResetPasswordEmail = async (
  email: string,
): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/user/reset-password-email?email=${email}`,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const resetPassword = async (
  password: string,
  token: string,
): Promise<ApiResponse> => {
  try {
    const filterToken = token.replace(/["\s]/g, "");
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/user/reset-password`,
      {
        password,
      },
      {
        params: {
          token: filterToken,
        },
        headers: {
          "content-type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getUser = async (token: any): Promise<any> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/user`,
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateUserPhone = async (phone: string): Promise<ApiResponse> => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      phone,
    };
    const response = await axios.put(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/user",
      data,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export function getToken() {
  const data: any = localStorage.getItem("persist:root");
  const parseData = JSON.parse(data);
  const auth = parseData.auth;
  const { token } = JSON.parse(auth);
  return token;
}

export function getUserInfo() {
  const data: any = localStorage.getItem("persist:root");
  const parseData = JSON.parse(data);
  const auth = parseData.auth;
  const { token, user } = JSON.parse(auth);

  return {
    token: token,
    role: user?.role,
    name: user?.name,
    state: stateOptions.find((state) => state.value === user?.state)?.label,
  };
}

export function handleStatus(response: ApiResponse): void {
  switch (response.status) {
    case 200:
      toast.success(response.message);
      break;
    case 400:
      toast.error(response.message);
      break;
    case 401:
      toast.error(response.message);
      break;
  }
}

export function handleCartStatus(response: CartApiResponse): void {
  switch (response.status) {
    case 200:
      toast.success(response.message);
      break;
    case 400:
      toast.error(response.message);
      break;
    case 401:
      toast.error(response.message);
      break;
  }
}

export async function checkVerification(to_verfiy: string, router: NextRouter) {
  switch (to_verfiy) {
    case "phone":
      await sendPhoneOtp();
      router.push("/verification");
      break;
    default:
  }
}
