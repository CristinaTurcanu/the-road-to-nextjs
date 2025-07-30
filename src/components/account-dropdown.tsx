import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { User as AuthUser } from "lucia";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";

import { signOut } from "@/features/auth/actions/sign-out";
import { accountPasswordPath, accountProfilePath } from "@/paths";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

type AccountDropdownProps = {
    user: AuthUser;
}

const AccountDropdown = ({ user }: AccountDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <Link href={accountProfilePath()}>
                        <LucideUser className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={accountPasswordPath()}>
                        <LucideLock className="mr-2 h-4 w-4" />
                        <span>Password</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <form action={signOut}>
                        <LucideLogOut className="mr-2 h-4 w-4" />
                        <button type="submit">Sign out</button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}

export {AccountDropdown}