import { UserService } from "@/services/user.service";
import { IUser, IUsersParams } from "@/types/user";
import { IApiResponse } from "@/types/web";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (params: IUsersParams = {}) => {
  return useQuery<IApiResponse<IUser>, Error>({
    queryKey: ["users", params.page, params.search, params.limit],
    queryFn: async () => {
      const { data } = await UserService.getAll(params);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
