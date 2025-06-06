import { Card, CardBody, CardHeader } from "@heroui/react";
import Link from "next/link";

interface PropTypes {
  children: React.ReactNode;
  rootError?: string;
  type: "login" | "register";
}

export const AuthLayout = (props: PropTypes) => {
  const { children, rootError, type } = props;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-neutral-200 p-6">
        <CardHeader className="flex justify-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {type === "login" ? "Login" : "Register"}
          </h2>
        </CardHeader>
        <CardBody>
          {rootError && (
            <p className="text-center text-red-500 text-sm ">{rootError}</p>
          )}
          {children}
          <p className="text-center text-slate-900 text-sm mt-4">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              href={type === "login" ? "/auth/register" : "/auth/login"}
              className="text-slate-700 hover:text-slate-900"
            >
              {type === "login"
                ? "  Create an account"
                : "  Login to your account"}
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
