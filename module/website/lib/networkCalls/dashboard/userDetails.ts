import axios from "axios";
import { ApiResponse } from "../../types/teetagTypes";

export const getAllUsers = async (): Promise<ApiResponse> => {
  try {
    const token = `${process.env.ADMIN_TOKEN}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/dashboard/admin/users",
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

export function getUserInfo(userId) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/users/get/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      },
    },
  );
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function deleteMinion(minionId) {
  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/minions/${minionId}`,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateUser(userId, data) {
  try {
    const response = await axios.put(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/users/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateMinion(minionId, data) {
  try {
    const response = await axios.put(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/minions/${minionId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getAllMinions = async (): Promise<ApiResponse> => {
  try {
    const token = `${process.env.ADMIN_TOKEN}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + "/dashboard/admin/minions",
      config,
    );

    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

export function getMinionInfo(userId) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/minions/get/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      },
    },
  );
}

export async function getAllApplications() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/application/all`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getApplication(id) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/application/app/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      },
    },
  );
}

export async function approveMinion(id, code) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/application/minion/approve/${id}`,
      {
        minion_code: code,
      },
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function createMinion(data) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/dashboard/admin/minions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function rejectMinion(id) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/application/minion/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data.message;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllInfluencers() {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/dashboard/admin/influencers`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      },
    },
  );
  return response.data;
}

export async function getInfluencerInfo(userId) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/influencers/get/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      },
    },
  );
}

export async function updateInfluencer(userId, data) {
  try {
    const response = await axios.put(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/influencers/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function createInfluencer(data) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/influencers`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteInfluencer(influencerId) {
  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/minions/${influencerId}`,
      {
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export function getAdminToken() {
  const data: any = localStorage.getItem("persist:root");
  const parseData = JSON.parse(data);
  const auth = parseData.auth;
  const { token } = JSON.parse(auth);
  return token;
}

export function getAWSSignedUrl(file) {
  return axios.post(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/aws/get-signed-url`,
    {
      url: file,
    },
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}
