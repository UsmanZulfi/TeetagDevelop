import axios from "axios";
import { ResultResponse } from "../types/teetagTypes";

export const getAllMinions = async (): Promise<ResultResponse> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/minion/all",
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const getProgress = async (): Promise<ResultResponse> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/store/progress",
    );
    return response.data.result;
  } catch (error: any) {
    return error.response?.data;
  }
};
