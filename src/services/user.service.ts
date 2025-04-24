import { endpoints } from "@/config/endpoints";
import instance from "@/config/instance";
import { IUsersParams } from "@/types/user";

export const UserService = {
  getAll: (params: IUsersParams) =>
    instance.get(endpoints.getAllUsers, {
      params,
    }),
};
