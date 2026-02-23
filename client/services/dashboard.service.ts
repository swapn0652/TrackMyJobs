// services/dashboard.service.ts

import { axiosClient } from "@/utils/axiosClient";

export const dashboardService = {
  getSummary: async () => {
    const res = await axiosClient.get("/api/dashboard/summary");
    return res.data.data;
  },

  getMonthly: async () => {
    const res = await axiosClient.get("/api/dashboard/monthly");
    return res.data.data;
  },

  getByStatus: async () => {
    const res = await axiosClient.get("/api/dashboard/by-status");
    return res.data.data;
  },

  getBySource: async () => {
    const res = await axiosClient.get("/api/dashboard/by-source");
    return res.data.data;
  },

  getRecentActivity: async () => {
    const res = await axiosClient.get("/api/dashboard/recent-activity");
    return res.data.data;
  },
};