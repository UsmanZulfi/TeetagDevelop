import { AmazonOrderType } from "@/website/lib/types/teetagTypes";
import axios from "axios";
import { ResultResponse } from "./../types/teetagTypes";

export const getPaymentDetail = async (
  transaction_id: string,
): Promise<ResultResponse> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/payment/order-detail?transaction_id=${transaction_id}`,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAmazonPaymentDetails = async (
  order: AmazonOrderType,
): Promise<ResultResponse> => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/payment/review",
      order,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
