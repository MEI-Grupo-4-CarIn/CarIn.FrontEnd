import { useQuery } from "react-query";
import api from "@/lib/axios";
import { User } from "@/types/user";
import { PaginationMeta } from "@/types/paginationMeta";
import { ApiError } from "@/types/error";

const fetchUsers = async (search: string, role: string, pageSize: number, page: number): Promise<{ data: User[]; meta: PaginationMeta }> => {
  const params: { page: number; perPage: number; search?: string; role?: string } = {
    page,
    perPage: pageSize,
  };
  if (search) {
    params.search = search;
  }
  if (role && role !== "all") {
    params.role = role;
  }

  const { data } = await api.get("/users", { params });
  return data;
};

export const useUsers = (search: string, role: string, pageSize: number, page: number) => {
  return useQuery<{ data: User[]; meta: PaginationMeta }, ApiError>(
    ["users", search, role, pageSize, page],
    () => fetchUsers(search, role, pageSize, page),
    { keepPreviousData: true }
  );
};
