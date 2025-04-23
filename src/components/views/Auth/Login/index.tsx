import { Button, Input, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useLogin } from "./useLogin";
import { AuthLayout } from "@/components/layouts/AuthLayut";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const LoginPage = () => {
  const {
    control,
    isPending,
    handleLogin,
    errors,
    handleSubmit,
    isVisible,
    toggleVisibility,
  } = useLogin();
  return (
    <AuthLayout type="login" rootError={errors.root?.message}>
      <form className="gap-y-2" onSubmit={handleSubmit(handleLogin)}>
        <Controller
          defaultValue=""
          name="identifier"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Email or Username"
              variant="underlined"
              autoComplete="off"
              isInvalid={errors.identifier !== undefined}
              errorMessage={errors.identifier?.message}
            />
          )}
        />
        <Controller
          defaultValue=""
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={isVisible ? "text" : "password"}
              label="Password"
              variant="underlined"
              autoComplete="off"
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEye className="pointer-events-none text-xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                  )}
                </button>
              }
            />
          )}
        />
        <Button
          type="submit"
          color="default"
          fullWidth
          className="bg-white text-black font-semibold flex justify-center items-center mt-4 "
        >
          {isPending ? <Spinner /> : "Login  "}
        </Button>
      </form>
    </AuthLayout>
  );
};
