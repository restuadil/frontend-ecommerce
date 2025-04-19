import { z } from "zod";

export const AuthValidation = {
  register: z.object({
    fullName: z.string().min(2),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  login: z.object({
    identifier: z.string(),
    password: z.string(),
  }),
};
