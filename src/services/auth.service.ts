import { endpoints } from "@/config/endpoints";
import instance from "@/config/instance";
import { ILogin, IRegister } from "@/types/auth";

export const AuthService = {
  login: async (payload: ILogin) =>
    await instance.post(endpoints.login, payload),
  register: async (payload: IRegister) =>
    await instance.post(endpoints.register, payload),
  profile: async (token: string) =>
    await instance.get(endpoints.profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
