import axios from "axios";
import { Order } from "../types/wooCommerceTypes";
import {
  ApiResponse,
  ContactProps,
  Contribute,
  OrderApiResponse,
  PayloadResponse,
} from "./../types/teetagTypes";
import { getToken } from "./authFunctions";
export const fetchCategory = async (id: string) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/store/category/${id}`,
  );
  return response.data.result.category;
};

export const fetchProducts = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/store/products?category=${id}&per_page=50`,
    );

    return response.data.result.products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCategories = async () => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      "/store/categories?per_page=10&exclude=60",
  );
  return response.data.result.categories;
};

export const fetchAllCategories = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        "/store/categories?per_page=50&exclude=60",
    );
    return response.data.result.categories;
};

export const fetchProduct = async (id: string): Promise<any> => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/store/product/${id}`,
  );
  return response.data.result.product;
};

export const fetchRelatedProducts = async (ids: number[]) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/store/product/[${ids}]/related`,
    );

    return response.data.result.products;
  } catch (e) {
    console.log(e);
  }
};

export const createOrder = async (
  orderObj: Order,
): Promise<OrderApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/payment/order",
      orderObj,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const contribute = async (
  contributeObj: Contribute,
): Promise<OrderApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/payment/contribute",
      contributeObj,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const saveContactForm = async (
  contact: ContactProps,
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/store/contact",
      contact,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getPayload = async (
  cart_id?: number,
): Promise<PayloadResponse> => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/payment/amazon-signature?cart_id=${cart_id ?? ""}`,
    );

    return response.data.result;
  } catch (e) {
    console.log(e);
  }
};

export const statesLeaderboard = async (limit = 55) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        "/store/top-states?limit=" +
        limit,
    );

    return response.data.result.states;
  } catch (e) {
    console.log(e);
    return [];
  }
};
