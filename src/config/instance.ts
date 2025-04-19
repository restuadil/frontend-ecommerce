import { env } from "@/config/env";
import { ISessionExtended } from "@/types/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: env.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: ISessionExtended | null = await getSession();
    if (session && session.accesToken) {
      request.headers.Authorization = `Bearer ${session.accesToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default instance;
