import MainButton from "@/components/Buttons/MainButton";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  submitAction: () => void;
  submitLabel: string;
  typeModel?: "signup" | "login";
}

const BodyForm = ({
  children,
  submitAction,
  submitLabel,
  typeModel,
}: Props) => {
  return (
    <div>
      {children}
      <MainButton
        typeBgButton={typeModel}
        submitAction={submitAction}
        submitLabel={submitLabel}
      />
    </div>
  );
};

export default BodyForm;
