import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initDatabase } from "@/db/database";

interface DbContextValue {
    dbReady: boolean;
}

const DbContext = createContext<DbContextValue>({ dbReady: false });

export const DbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dbReady, setDbReady] = useState(false);

    useEffect(() => {
        const prepareDb = async () => {
            await initDatabase();
            setDbReady(true);
        };

        prepareDb().catch(console.error);
    }, []);

    return <DbContext.Provider value={{ dbReady }}>{children}</DbContext.Provider>;
};

export const useDb = () => useContext(DbContext);
