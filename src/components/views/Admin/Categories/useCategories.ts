import { CategoryService } from "@/services/category.service";
import { ICategory, ICategoryParams } from "@/types/category";
import { IApiResponse } from "@/types/web";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (params: ICategoryParams) => {
  return useQuery<IApiResponse<ICategory>>({
    queryKey: ["categories", params.page, params.search, params.limit],
    queryFn: async () => {
      const { data } = await CategoryService.getAll(params);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
