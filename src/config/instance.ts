import axios from "axios";
import { getSession } from "next-auth/react";
import { env } from "./env";
import { ISessionExtended } from "@/types/auth";

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
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
