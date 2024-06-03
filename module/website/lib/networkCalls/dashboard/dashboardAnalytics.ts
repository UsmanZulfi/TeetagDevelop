import axios from "axios";
import { getAdminToken } from "./userDetails";

//admin dashboard
export function getDashboard() {
  return axios.get(process.env.NEXT_PUBLIC_STAGING_SERVER_URL + `dashboard`, {
    headers: {
      Authorization: `Bearer ${getAdminToken()}`,
    },
  });
}

//dashboard graph
export function getMonthlyChartData(months) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/monthly-chart?months=${months}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//user analytics
export function getUserAnalytics() {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/users/analytics`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//user analytics graph
export function getUserAnalyticsGraph(months, type) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/users/analytics/chart?months=${months}&chart=${type}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//minions analytics
export function getMinionsAnalytics() {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/minions/analytics`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//minions analytics graph
export function getMinionsAnalyticsGraph(months, type) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/minions/analytics/chart?months=${months}&chart=${type}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//influencer analytics
export function getInfluencerAnalytics() {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/influencers/analytics`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//influencer analytics graph
export function getInfluencerAnalyticsGraph(months, type) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/admin/influencers/analytics/chart?months=${months}&chart=${type}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//minion  analytics chart
export function getMinionDashboardAnalyticsGraph(months, type) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/minion/analytics/chart?months=${months}&chart=${type}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//influencer  analytics chart
export function getInfluencerDashboardAnalyticsGraph(months, type) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/influencer/analytics/chart?months=${months}&chart=${type}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}

//user  analytics chart
export function getUserDashboardAnalyticsGraph(months, type) {
  return axios.get(
    process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      `/dashboard/user/analytics/chart?months=${months}&chart=${type}`,
    {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    },
  );
}
