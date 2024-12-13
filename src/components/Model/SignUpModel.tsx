"use client";

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import MainInput from "../Inputs/MainInput";
import FormModel from "./FormModel/FormModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/libs/ValidateForm";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUpModel = () => {
  const metods = useForm({ resolver: zodResolver(signupSchema), mode: "all" });
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await signIn("signup", {
      redirect: false,
      ...data,
    });
    if (res?.ok) {
      console.log(res);
      toast.success("Created user");
      router.push("/");
      return;
    }
    console.log(res?.error);
    toast.error(res?.error as string);
  };

  const body = (
    <>
      <MainInput id="name" placeholder="Username" />
      <MainInput id="email" placeholder="Email" />
      <MainInput id="password" placeholder="Password" />
      <MainInput id="confirmPassword" placeholder="Confirm Password" />
    </>
  );

  return (
    <FormProvider {...metods}>
      <FormModel
        body={body}
        title="Signup"
        content="Just some details to get you in.!"
        submitAction={metods.handleSubmit(onSubmit)}
        submitLabel="Signp"
        typeModel="signup"
      />
    </FormProvider>
  );
};

export default SignUpModel;
