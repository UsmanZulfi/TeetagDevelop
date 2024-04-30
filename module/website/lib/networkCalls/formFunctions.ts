import axios from "axios";
import { FileWithPath } from "react-dropzone";
import {
  BulkOrder,
  FilesUploadResponse,
  FileUploadResponse,
  ScholarShip,
  Tagee,
} from "../types/teetagTypes";

import { ApiResponse, Minion } from "../types/teetagTypes";
import { getToken } from "./authFunctions";

export const createMinion = async (minion: Minion): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/application/minion",
      minion,
      config,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const uploadFile = async (
  file: FileWithPath,
): Promise<FileUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/aws/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const uploadMultipleFile = async (
  files: FileWithPath[],
): Promise<FilesUploadResponse> => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/aws/upload-multiple",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const applyScholarship = async (
  scholarship: ScholarShip,
): Promise<ApiResponse> => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url =
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/application/scholarship";
    const response = await axios.post(url, scholarship, config);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const requestBulkOrder = async (
  bulkOrder: BulkOrder,
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/bulk-order/create",
      bulkOrder,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createTagee = async (tagee: Tagee): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/tagee/create",
      tagee,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
