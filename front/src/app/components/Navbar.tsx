import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Lilita_One } from "next/font/google";


const font = Lilita_One({weight: "400", subsets: ["latin"]})
const Navbar = () => {
  return (
    <header className="py-5">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex justify-between gap-10">
          <div>
            <Link href="/">
              <div className={`${font.className} text-3xl dark:text-amber-50`}>Dev  <span className="text-purple-500">  Blog </span></div>
            </Link>
          </div>

          <div><ThemeToggle/></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
