import { Children, createContext, useState } from "react";


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [sidebarData, setsidebarData] = useState(null);

    return (
        <AppContext.Provider value={{ sidebarData, setsidebarData }}>
            {children}
        </AppContext.Provider>
    );
};

