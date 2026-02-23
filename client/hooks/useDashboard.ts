import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export const useSummary = () =>
  useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: dashboardService.getSummary,
  });

export const useMonthly = () =>
  useQuery({
    queryKey: ["dashboard-monthly"],
    queryFn: dashboardService.getMonthly,
  });

export const useStatus = () =>
  useQuery({
    queryKey: ["dashboard-status"],
    queryFn: dashboardService.getByStatus,
  });

export const useSource = () =>
  useQuery({
    queryKey: ["dashboard-source"],
    queryFn: dashboardService.getBySource,
  });

export const useRecentActivity = () =>
  useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: dashboardService.getRecentActivity,
  });

export const useFunnel = () =>
  useQuery({
    queryKey: ["dashboard-funnel"],
    queryFn: dashboardService.getFunnel,
  });