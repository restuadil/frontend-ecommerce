import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ISessionExtended extends Session {
  accesToken?: string;
}

export interface IUserExtended extends User {
  accessToken?: string;
  role?: string;
}

export interface IJWTExtended extends JWT {
  user?: IUserExtended;
}
export interface ILogin {
  identifier: string;
  password: string;
}

export interface IRegister {
  fullName: strin;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IActivation {
  code: string;
}
