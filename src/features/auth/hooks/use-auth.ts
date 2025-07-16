import { User as AuthUser } from "lucia";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getAuth } from "../queries/get-auth";

const useAuth = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loaded, setLoaded] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            const {user} = await getAuth();
            setUser(user);
            setLoaded(true);
        };
        fetchUser();
    }, [pathname]);

    return { user, loaded };
};

export {useAuth};