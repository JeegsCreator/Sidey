import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

const CardSideyFooter = ({ children }: { children: ReactElement }) => {
  return (
    <div className="relative">
      {children}
      <footer className="flex justify-center items-center gap-1 mt-3 absolute -bottom-10 w-full text-sm text-slate-500">
        <Image src="/sidey.svg" width={24} height={24} alt="Sidey logo" />
        <span className=" ml-1">Sidey • by</span>
        <Link
          href="https://twitter.com/JeegsCreator"
          target="_blank"
          className="underline"
        >
          @JeegsCreator
        </Link>
      </footer>
    </div>
  );
};

export default CardSideyFooter;
