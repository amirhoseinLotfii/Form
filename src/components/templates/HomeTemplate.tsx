"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HomeTemplate = () => {
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <div onClick={() => signOut()}>signout</div>
          <div>{session?.user?.email}</div>
        </div>
      ) : (
        <div>
          <Link href={"/signup"}>Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomeTemplate;
