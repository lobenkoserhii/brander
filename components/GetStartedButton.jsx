import React from 'react';
import Link from "next/link";

function GetStartedButton({ isDesktop }) {
  const className = isDesktop ? "hidden TB:flex" : "TB:hidden";
  return (
    <Link href="/contacts" passHref>
      <div className={`${className} order-3 text-white bg-black dark:text-Bl dark:bg-white w-full h-10 px-6 py-2 rounded-[30px] justify-center items-center gap-2 text-lg`}>
        Get Started
      </div>
    </Link>
  );
}

export default GetStartedButton;