// MiContexto.js
import React, { useState } from "react";

// Crear el Context
export const ContextData = React.createContext();

// Crear el Provider
export const ContextDataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    return (
        <ContextData.Provider value={{ data, setData }}>
            {children}
        </ContextData.Provider>
    );
};
