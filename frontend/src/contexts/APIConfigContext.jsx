import React, { createContext, useContext } from 'react';

const APIConfigContext = createContext();

export const useAPIConfig = () => {
    const context = useContext(APIConfigContext);
    if (context === undefined) {
        throw new Error('useAPIConfig must be used within an APIConfigProvider');
    }
    return context;
};

export const APIConfigProvider = ({ children }) => {
    const backendHost = import.meta.env.VITE_BACKEND_HOST || 'localhost';
    const backendPort = import.meta.env.VITE_BACKEND_PORT || '3131';
    
    console.log('Environment variables:', {
        VITE_BACKEND_HOST: import.meta.env.VITE_BACKEND_HOST,
        VITE_BACKEND_PORT: import.meta.env.VITE_BACKEND_PORT,
        backendHost,
        backendPort
    });
    
    const backendBaseUrl = `http://${backendHost}:${backendPort}`;
    console.log('Backend URL:', backendBaseUrl);

    return <APIConfigContext.Provider value={{ backendBaseUrl }}>{children}</APIConfigContext.Provider>;
};