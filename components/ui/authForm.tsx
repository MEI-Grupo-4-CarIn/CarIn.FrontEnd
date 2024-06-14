import Image from "next/image";
import { ReactNode } from "react";
import AnimatedBackground from "@/components/ui/animatedBackground";

interface AuthFormProps {
  children: ReactNode;
}

export default function AuthForm({ children }: AuthFormProps) {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      <AnimatedBackground />
      <div className="relative flex items-center justify-center py-12 z-10 w-full">
        <div className="mx-auto grid max-w-[350px] md:max-w-[450px] gap-6 bg-white p-8 rounded-md shadow-md">
          <div className="flex justify-center mb-4">
            <Image src="/carin_logo.svg" alt="CarIn" width={100} height={100} className="object-contain" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
