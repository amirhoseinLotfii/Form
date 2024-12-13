"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const FooterForm = ({ typeModel }: { typeModel?: "signup" | "login" }) => {
  const path = usePathname();

  const SignupGoogle = async () => {
    const res = await signIn("google", { callbackUrl: "/" });
    if (res?.error && path !== "/") {
      console.log(res.error);
      toast.error("Error in Login");
    }
  };

  const SignupGithub = async () => {
    const res = await signIn("github", { callbackUrl: "/" });

    if (res?.error && path !== "/") {
      console.log(res.error);
      toast.error("Error in Login");
    }
  };

  return (
    <div className="space-y-4">
      {/*  */}
      <div className=" flex items-center justify-betwee gap-3">
        <div className="h-0.5 w-full bg-gray-700/90"></div>
        <p className="text-gray-400">or</p>
        <div className="h-0.5 w-full bg-gray-700/90"></div>
      </div>
      {/*  */}

      {/* buttons */}
      <div className="flex justify-center gap-4">
        <button onClick={SignupGoogle} className="relative size-7">
          <Image src={"/images/icons/devicon_google.jpg"} alt="" fill />
        </button>
        <button onClick={SignupGithub} className="relative size-7">
          <Image src={"/images/icons/bi_githubu.png"} alt="" fill />
        </button>
      </div>

      {/* already you have account */}
      <div>
        <p className="text-white text-center text-sm">
          <span>
            {typeModel && typeModel === "signup"
              ? "Already Registered ?"
              : "Don’t have an account ?"}
          </span>{" "}
          <span className="hover:underline hover:text-purple-500 cursor-pointer">
            <Link
              href={typeModel && typeModel === "signup" ? "/login" : "/signup"}
            >
              {typeModel && typeModel === "signup" ? "Login" : "Signup"}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FooterForm;
