import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="py-14 px-4 mb-12 text-center border-b dark:border-purple-900">
      <h2 className="uppercase text-2xl mx-auto max-w-2xl font-bold">
        {" "}
        {title}{" "}
      </h2>

      {tags && (
        <Link href={"/tag"} className="hover:bg-purple-900 px-2 mt-2">
          #tags
        </Link>
      )}
    </header>
  );
};

export default Header;
