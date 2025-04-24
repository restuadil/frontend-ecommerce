export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T[];
  pagination: IPagination;
}

export interface IPagination {
  totalData: number;
  limit: number;
  currentPage: number;
  totalPage: number;
}
