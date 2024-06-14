import { useQuery } from "react-query";
import api from "@/lib/axios";
import { Vehicle } from "@/types/vehicle";
import { PaginationMeta } from "@/types/paginationMeta";
import { ApiError } from "@/types/error";

const fetchVehicles = async (search: string, status: string, pageSize: number, page: number): Promise<{ data: Vehicle[]; meta: PaginationMeta }> => {
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

  const { data } = await api.get("/vehicles", { params });
  return data;
};

export const useVehicles = (search: string, status: string, pageSize: number, page: number) => {
  return useQuery<{ data: Vehicle[]; meta: PaginationMeta }, ApiError>(
    ["vehicles", search, status, pageSize, page],
    () => fetchVehicles(search, status, pageSize, page),
    { keepPreviousData: true }
  );
};
