"use client";

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormModel from "./FormModel/FormModel";
import MainInput from "../Inputs/MainInput";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/libs/ValidateForm";

const LoginModel = () => {
  const metods = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await signIn("login", {
      callbackUrl: "/",
      name: "login-name",
      ...data,
    });
    if (res?.ok) {
      console.log(res);
      toast.success("Loggined user");
      return;
    }
    console.log(res?.error);
    toast.error(res?.error as string);
  };

  const body = (
    <>
      <MainInput id="name" placeholder="Username" />
      <MainInput id="password" placeholder="Password" />
    </>
  );

  return (
    <FormProvider {...metods}>
      <FormModel
        body={body}
        title="Login"
        content="Glad you’re back.!"
        submitAction={metods.handleSubmit(onSubmit)}
        submitLabel="Signp"
        typeModel="login"
      />
    </FormProvider>
  );
};

export default LoginModel;
