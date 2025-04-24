import { endpoints } from "@/config/endpoints";
import instance from "@/config/instance";
import { ICateoryParams } from "@/types/category";

export const CategoryService = {
  getAll: (params: ICateoryParams) =>
    instance.get(endpoints.getAllCateogries, {
      params,
    }),
};
