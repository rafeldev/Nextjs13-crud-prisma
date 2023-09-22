import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h3 className="font-bold text-3xl py-3">NextCrud</h3>
        </Link>
        <ul className="flex gap-x-2 text-lg font-bold">
          <li>
            <Link className="text-slate-300 hover:text-slate-200" href="/new">
              New
            </Link>
          </li>
          <li>
            <Link className="text-slate-300 hover:text-slate-200" href="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
