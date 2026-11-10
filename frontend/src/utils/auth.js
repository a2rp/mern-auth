import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        let active = true;
        api.post("/user")
            .then(({ data }) => {
                if (!active) return;
                if (data.success && data.user) {
                    setUser(data.user);
                    setStatus("authenticated");
                } else {
                    setStatus("anonymous");
                }
            })
            .catch(() => {
                if (active) setStatus("anonymous");
            });
        return () => { active = false; };
    }, []);

    const login = useCallback((sessionUser) => {
        setUser(sessionUser);
        setStatus("authenticated");
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post("/user/logout");
        } catch {
            // Clear the client session even if the API is temporarily unreachable.
        }
        setUser(null);
        setStatus("anonymous");
    }, []);

    const value = useMemo(() => ({ user, status, login, logout }), [user, status, login, logout]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
