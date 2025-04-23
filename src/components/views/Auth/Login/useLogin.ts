import { ILogin } from "@/types/auth";
import { AuthValidation } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const callbackUrl: string = (router.query.callbackUrl as string) || "/";
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ILogin>({
    resolver: zodResolver(AuthValidation.LOGIN),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: ILogin) => {
      const result = await signIn("credentials", {
        ...payload,
        redirect: false,
        callbackUrl,
      });
      if (result?.error && result?.status === 401) {
        throw new Error("Login Failed");
      }
    },
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: async () => {
      router.push(callbackUrl);
      reset();
    },
  });

  const handleLogin = (payload: ILogin) => mutate(payload);

  return {
    isVisible,
    toggleVisibility,
    control,
    errors,
    reset,
    mutate,
    isPending,
    handleLogin,
    handleSubmit,
  };
};
