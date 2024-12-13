"use client";

import HeaderForm from "./HeaderForm";
import BodyForm from "./BodyForm";
import { ReactNode } from "react";
import FooterForm from "./FooterForm";

interface Props {
  title: string;
  content: string;
  body: ReactNode;
  submitAction: () => void;
  submitLabel: string;
  typeModel?: "signup" | "login";
}

const FormModel = ({
  body,
  content,
  submitAction,
  title,
  submitLabel,
  typeModel,
}: Props) => {
  return (
    <div
      className="w-auto sm:min-w-96 pt-8 px-10 pb-6 border border-gray-200
       rounded-2xl backdrop-blur-sm  flex flex-col gap-5"
    >
      <HeaderForm title={title} content={content} />
      <BodyForm
        submitAction={submitAction}
        submitLabel={submitLabel}
        typeModel={typeModel}
      >
        {body}
      </BodyForm>
      <FooterForm typeModel={typeModel} />
    </div>
  );
};

export default FormModel;
