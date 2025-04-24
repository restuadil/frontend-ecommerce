import { endpoints } from "@/config/endpoints";
import instance from "@/config/instance";
import { ICategoryParams } from "@/types/category";

export const CategoryService = {
  getAll: (params: ICategoryParams) =>
    instance.get(endpoints.getAllCateogries, {
      params,
    }),
};
