import axios from "axios";

export async function getRequestedScholarshipApplications() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/applications?role=scholarshipRecipient&status=pending`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
        },
      },
    );
    console.log(response.data);
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
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

export async function getRequestedApplication(id) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `/application/app/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

export async function createScholarshipReceipient(id, data) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/applications/${id}/change-status?action=approve`,
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

//reject application
export async function rejectApplication(id) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/applications/${id}/change-status?action=reject`,
      {},
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

export async function getScholarship(id) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/scholarships/get/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

export async function updateScholarshipApplicationStatus(id, data) {
  try {
    const response = await axios.put(
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
        `/dashboard/admin/scholarships/${id}/change-status`,
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

export function getAdminToken() {
  if (typeof window === "undefined") {
    return process.env.ADMIN_TOKEN;
  }
  const data: any = localStorage.getItem("persist:root");
  const parseData = JSON.parse(data);
  const auth = parseData.auth;
  const { token } = JSON.parse(auth);
  return token;
}
