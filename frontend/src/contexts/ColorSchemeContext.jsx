import React, { createContext, useContext, useState, useEffect } from "react";

const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({children}) => {
    const[colorScheme, setColorScheme] = useState('light');

    const toggleColorScheme = () => {
        setColorScheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setColorScheme(prefersDark ? "dark" : "light");
    }, []);

    return (
        <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme}}>
            {children}
        </ColorSchemeContext.Provider>
    );
};

export const useColorScheme = () => useContext(ColorSchemeContext);