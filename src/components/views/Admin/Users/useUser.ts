// hooks/useUser.ts
import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export interface User {
  _id: string;
  fullName: string;
  email: string;
}

export interface Pagination {
  totalData: number;
  limit: number;
  currentPage: number;
  totalPage: number;
}

interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User[];
  pagination: Pagination;
}

interface FetchUsersParams {
  page?: number;
  search?: string;
  limit?: number;
}

const fetchUsers = async ({
  page = 1,
  search = "",
  limit = 20,
}: FetchUsersParams): Promise<ApiResponse> => {
  const { data } = await UserService.getAll({ page, search, limit });
  return data;
};

export const useUsers = (params: FetchUsersParams = {}) => {
  return useQuery<ApiResponse>({
    queryKey: ["users", params.page, params.search],
    queryFn: () => fetchUsers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
