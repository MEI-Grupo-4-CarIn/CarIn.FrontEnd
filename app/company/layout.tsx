"use client";

import "@/styles/globals.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import CarInIconSVG from "@/public/carin_logo.svg";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/protectedRoute";

interface CompanyLayoutProps {
  children: ReactNode;
}

export default function CompanyLayout({ children }: CompanyLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const getLinkClass = (path: string) => (pathname === path ? "text-foreground" : "text-muted-foreground");

  return (
    <ProtectedRoute>
      <div>
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="/company/dashboard">
              <CarInIconSVG className="h-8" />
              <span className="sr-only">CarIn</span>
            </Link>
            <Link className={getLinkClass("/company/dashboard")} href="/company/dashboard">
              Dashboard
            </Link>
            <Link className={getLinkClass("/company/users")} href="/company/users">
              Users
            </Link>
            <Link className={getLinkClass("/company/vehicles")} href="/company/vehicles">
              Vehicles
            </Link>
            <Link className={getLinkClass("/company/routes")} href="/company/routes">
              Routes
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="shrink-0 md:hidden" size="icon" variant="outline">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link className="flex items-center gap-2 text-lg font-semibold" href="dashboard">
                  <CarInIconSVG className="h-8" />
                  <span className="sr-only">CarIn</span>
                </Link>
                <Link className={getLinkClass("/company/dashboard")} href="/company/dashboard">
                  Dashboard
                </Link>
                <Link className={getLinkClass("/company/users")} href="/company/users">
                  Users
                </Link>
                <Link className={getLinkClass("/company/vehicles")} href="/company/vehicles">
                  Vehicles
                </Link>
                <Link className={getLinkClass("/company/routes")} href="/company/routes">
                  Routes
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="secondary">
                  <CircleUserIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user ? `${user.firstName} ${user.lastName}` : "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="#">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#">Contacts</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CircleUserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}
