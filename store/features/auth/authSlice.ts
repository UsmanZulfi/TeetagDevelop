import { User } from "@/website/lib/types/teetagTypes";
import { Cart } from "@/website/lib/types/wooCommerceTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "./../../../module/website/lib/types/teetagTypes";
import {
  Billing,
  Shipping,
} from "./../../../module/website/lib/types/wooCommerceTypes";

interface AuthState {
  error: string | undefined;
  loading: boolean;
  user: User | null;
  token: string | null;
  productRoute: string | null;
  cart: Cart | null;
  shipping: Shipping | null;
  billing: Billing | null;
}

const initialState: AuthState = {
  user: null,
  error: "",
  loading: false,
  token: null,
  productRoute: null,
  cart: null,
  billing: null,
  shipping: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.productRoute = null;
      state.cart = null;
      state.billing = null;
      state.shipping = null;
    },
    addPhoneNumber: (state: AuthState, action: PayloadAction<string>) => {
      state.user!.phone = action.payload;
    },
    updateUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateProductRoute: (state: AuthState, action: PayloadAction<string>) => {
      state.productRoute = action.payload;
    },
    updateCart: (state: AuthState, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    updateShipping: (state: AuthState, action: PayloadAction<Shipping>) => {
      state.shipping = action.payload;
    },
    updateBilling: (state: AuthState, action: PayloadAction<Billing>) => {
      state.billing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;

export const {
  logout,
  updateToken,
  addPhoneNumber,
  updateUser,
  updateProductRoute,
  updateCart,
  updateShipping,
  updateBilling,
} = authSlice.actions;

export const login = createAsyncThunk(
  "auth/login",
  async (
    payload: { loginOption: string; password: string },
    { rejectWithValue },
  ): Promise<any> => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/auth/signin`,
        payload,
      );
      const user = response.data.result;
      return user;
    } catch (error: any) {
      const errorResponse: AxiosError<ErrorResponse> = error.response.data;
      throw rejectWithValue(errorResponse.message);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: {
      name: string;
      email: string;
      password: string;
      phone: string;
    },
    { rejectWithValue },
  ): Promise<any> => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/auth/register`,
        payload,
      );
      const user = response.data.result;

      return user;
    } catch (error: any) {
      const errorResponse: AxiosError<ErrorResponse> = error.response.data;
      throw rejectWithValue(errorResponse.message);
    }
  },
);
