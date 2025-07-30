"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";

import ThemeSwitcher from "@/components/theme/theme-switcher";
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/paths";

import { AccountDropdown } from "./account-dropdown";


const Header = () => {
    const { user, loaded } = useAuth();

    if (!loaded) {
        return null;
    }

    const navItems = user ? (
        <AccountDropdown user={user} />
    ) : (
        <>
            <Button asChild variant="outline">
                <Link href={signInPath()}>Sign in</Link>
            </Button>
            <Button asChild variant="outline">
                <Link href={signUpPath()}>Sign up</Link>
            </Button>
        </>
    )   
 ;

    return (
        <nav className="
        animate-header-from-top
        supports-backdrop-blur:bg-background
        border-b bg-background/95 backdrop-blur 
        flex justify-between items-center py-2.5 px-5 justify-between 
        w-full fixed top-0 left-0 right-0 z-50"
        >
            <div className="flex align-items gap-x-2">
                <Button asChild variant="ghost">
                    <Link href={homePath()}><LucideKanban /><h1 className="ml-2 text-lg font-semibold">Tixhub</h1></Link>
                </Button>
            </div>
            <div className="flex align-items gap-x-2">
                <ThemeSwitcher />
                {navItems}
            </div>
        </nav>
    );
};
export default Header;