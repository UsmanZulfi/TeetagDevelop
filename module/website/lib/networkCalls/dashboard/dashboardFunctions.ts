import axios from "axios";
import { ApiResponse } from "../../types/teetagTypes";
import { getAdminToken } from "./userDetails";

export const getSettingsData = async (): Promise<ApiResponse> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        "/dashboard/admin/static-data",
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateSettingsData = async (data: any): Promise<ApiResponse> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    };
    const response = await axios.put(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        "/dashboard/admin/static-data",
      data,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const sendEmail = async (data: any): Promise<ApiResponse> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        "/dashboard/admin/compaign-email?target=" +
        data.target,
      { subject: data.subject, message: data.message },
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getPreLaunchUsers = async (): Promise<ApiResponse> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/pre-launch-user/all",
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
