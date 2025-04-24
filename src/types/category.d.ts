export interface ICategory {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ICategoryParams {
  page?: number;
  search?: string;
  limit?: number;
}
