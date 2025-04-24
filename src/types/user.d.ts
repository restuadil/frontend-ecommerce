export interface IUser {
  _id: string;
  fullName: string;
  email: string;
}

export interface IUsersParams {
  page?: number;
  search?: string;
  limit?: number;
}
