import { IRegister } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthValidation } from "@/validation/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export const useRegister = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IRegister>({
    resolver: zodResolver(AuthValidation.REGISTER),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: IRegister) =>
      await AuthService.register(payload),
    onError(error) {
      const err = error as AxiosError<{ message: string }>;
      setError("root", {
        message: err.response?.data.message,
      });
    },
    onSuccess() {
      reset();
      router.push("/auth/login");
    },
  });
  const handleRegister = (payload: IRegister) => mutate(payload);

  return {
    control,
    errors,
    reset,
    mutate,
    isPending,
    handleRegister,
    handleSubmit,
  };
};
