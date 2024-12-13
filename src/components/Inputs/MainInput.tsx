"use client";

import { useFormContext } from "react-hook-form";

interface Props {
  id: string;
  placeholder: string;
}

const MainInput = ({ id, placeholder }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <input
        {...register(id)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-transparent border border-white text-white
      placeholder:text-white font-thin"
      />

      <p className="text-red-600 h-7 pl-2 text-sm mt-1 mb-2 overflow-hidden">
        {errors?.[id] && (errors?.[id]?.message as string)}
      </p>
    </div>
  );
};

export default MainInput;
