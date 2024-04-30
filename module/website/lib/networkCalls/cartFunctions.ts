import axios from "axios";
import { Cart, CartItem } from "../types/wooCommerceTypes";
import {
  ApiResponse,
  CartApiResponse,
  CartItemWithoutQuantity,
  RemovedItem,
} from "./../types/teetagTypes";
import { getToken } from "./authFunctions";

export const clearCart = async (cart_id: string): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/store/cart/clear?cart_id=${cart_id}`,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const addToCart = async (cart: CartItem): Promise<CartApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/store/cart/add`,
      cart,
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const addCart = async (
  cart: CartItemWithoutQuantity,
): Promise<CartApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/store/cart/add`,
      cart,
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCart = async (): Promise<CartApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/store/cart",
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const removeCart = async (
  cart: CartItemWithoutQuantity | RemovedItem,
): Promise<CartApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/store/cart/remove",
      cart,
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

//insert Cart if user was not logged in
export const insertCart = async (cart: Cart): Promise<CartApiResponse> => {
  try {
    const token = JSON.parse(localStorage.getItem("userToken")) || getToken();
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/store/cart/insert",
      { cart },
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const validateMinionCode = async (
  minionCode: string,
): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        "/store/verify-code/" +
        minionCode,
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getDefaultMinionCode = async (): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/user/chain-code",
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
