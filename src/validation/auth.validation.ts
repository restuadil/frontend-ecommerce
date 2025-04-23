import { z } from "zod";

export const AuthValidation = {
  REGISTER: z.object({
    fullName: z.string().min(2),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  LOGIN: z.object({
    identifier: z.string(),
    password: z.string(),
  }),
};
