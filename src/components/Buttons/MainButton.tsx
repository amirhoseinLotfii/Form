"use client";

import classNames from "classnames";

interface Props {
  submitAction: () => void;
  submitLabel: string;
  typeBgButton?: "login" | "signup";
}

const MainButton = ({ submitAction, submitLabel, typeBgButton }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        submitAction();
      }}
      type="submit"
      className={classNames(
        "px-2.5 py-3 w-full bg-gradient-to-r from-blue-600 to-blue-900",
        "rounded-xl text-white font-semibold ",
        {
          "from-blue-500 to-blue-800": typeBgButton === "signup",
          "from-blue-400 to-purple-800": typeBgButton === "login",
        }
      )}
    >
      {submitLabel}
    </button>
  );
};

export default MainButton;
