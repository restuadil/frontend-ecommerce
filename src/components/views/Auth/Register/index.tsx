import { Input, Button, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useRegister } from "./useRegister";
import { AuthLayout } from "@/components/layouts/AuthLayut";

export const RegisterPage = () => {
  const { control, isPending, handleRegister, errors, handleSubmit } =
    useRegister();
  return (
    <AuthLayout type="register" rootError={errors.root?.message}>
      <form className="space-y-2" onSubmit={handleSubmit(handleRegister)}>
        <Controller
          defaultValue=""
          name="fullName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="FullName"
              variant="underlined"
              autoComplete="off"
              isInvalid={errors.fullName !== undefined}
              errorMessage={errors.fullName?.message}
            />
          )}
        />
        <Controller
          defaultValue=""
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Username"
              variant="underlined"
              autoComplete="off"
              isInvalid={errors.username !== undefined}
              errorMessage={errors.username?.message}
            />
          )}
        />
        <Controller
          defaultValue=""
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              variant="underlined"
              autoComplete="off"
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
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
              type="password"
              label="Password"
              variant="underlined"
              autoComplete="off"
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          color="default"
          fullWidth
          className="bg-white text-black font-semibold"
        >
          {isPending ? <Spinner size="sm" /> : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};
