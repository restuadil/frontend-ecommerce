import { endpoints } from "@/config/endpoints";
import instance from "@/config/instance";

export const UserService = {
  getAll: ({ page = 1, search = "", limit = 20 }) =>
    instance.get(endpoints.getAllUsers, {
      params: {
        page,
        search,
        limit,
      },
    }),
};
