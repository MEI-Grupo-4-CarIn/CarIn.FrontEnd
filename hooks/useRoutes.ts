import { useQuery } from "react-query";
import api from "@/lib/axios";
import { Route } from "@/types/route";
import { PaginationMeta } from "@/types/paginationMeta";
import { ApiError } from "@/types/error";

const fetchRoutes = async (search: string, status: string, pageSize: number, page: number): Promise<{ data: Route[]; meta: PaginationMeta }> => {
  const params: { page: number; perPage: number; search?: string; status?: string } = {
    page,
    perPage: pageSize,
  };
  if (search) {
    params.search = search;
  }
  if (status && status !== "all") {
    params.status = status;
  }

  const { data } = await api.get("/routes", { params });
  return data;
};

const fetchRouteById = async (id: string): Promise<Route> => {
  const { data } = await api.get(`/routes/${id}`);
  return data;
};

const fetchTotalRoutes = async (): Promise<number> => {
  const { data } = await api.get("/routes", { params: { page: 1, perPage: 1 } });
  return data.meta.totalItems;
};

export const useRoutes = (search: string, status: string, pageSize: number, page: number) => {
  return useQuery<{ data: Route[]; meta: PaginationMeta }, ApiError>(
    ["routes", search, status, pageSize, page],
    () => fetchRoutes(search, status, pageSize, page),
    { keepPreviousData: true }
  );
};

export const useRouteById = (id: string) => {
  return useQuery<Route, ApiError>(["route", id], () => fetchRouteById(id), { enabled: !!id });
};

export const useTotalRoutes = () => {
  return useQuery<number, ApiError>("totalRoutes", fetchTotalRoutes);
};
