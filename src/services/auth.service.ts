import { endpoints } from "@/config/endpoints";
import instance from "@/config/instance";
import { ILogin, IRegister } from "@/types/auth";

export const AuthService = {
  login: (payload: ILogin) => instance.post(endpoints.login, payload),
  register: (payload: IRegister) => instance.post(endpoints.register, payload),
  profile: (token: string) =>
    instance.get(endpoints.profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
