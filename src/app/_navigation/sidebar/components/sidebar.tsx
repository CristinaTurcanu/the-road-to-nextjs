"use client";

import { usePathname } from "next/navigation";
import { useState } from "react"

import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { signInPath, signUpPath } from "@/paths";
import { getActivePath } from "@/utils/get-active-path";

import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
    const [isTransition, setTransition] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const { user, loaded } = useAuth();
    const pathname = usePathname();
    const {activeIndex} = getActivePath(
        pathname, 
        navItems.map((item) => item.href),
        [signInPath(), signUpPath()]
    );

    const handleToggle = (open: boolean) => {
        setTransition(true);
        setOpen(open);
        setTimeout(() => setTransition(false), 200);
    }

    if (!user || !loaded) {
        return <div className="w-[78px] bg-secondar/20" />;
    }

    return (
        <nav className={cn(
            'animate-sidebar-from-left',
            'h-screen border-r pt-24',
            isTransition && 'duration-200',
            isOpen ? 'md:w-60 w-[78px]' : 'w-[78px]'
        )}
        onMouseEnter={() => handleToggle(true)}
        onMouseLeave={() => handleToggle(false)}
        >
            <div className="px-3 py-2">
                <nav className="space-y-2">
                    {navItems.map((navItem, index) => (
                        <SidebarItem 
                            key={navItem.title}
                            isOpen={isOpen}
                            navItem={navItem}
                            isActive={activeIndex === index}
                        />
                    ))}
                </nav>
            </div>
        </nav>
    );
}

export { Sidebar }