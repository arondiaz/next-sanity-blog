import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="py-5">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex justify-between gap-10">
          <div>
            <Link href="/">
              <div>Dev Blog</div>
            </Link>
          </div>

          <div><ThemeToggle/></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
