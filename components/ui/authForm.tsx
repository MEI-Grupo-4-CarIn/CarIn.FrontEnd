import Image from "next/image";
import { ReactNode } from "react";

interface AuthFormProps {
  children: ReactNode;
}

export default function AuthForm({ children }: AuthFormProps) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">{children}</div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/carin_logo.svg"
          alt="CarIn"
          width="1920"
          height="1080"
          className="h-full w-full object-contain p-12 dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
