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
    // Use relative URLs in production
    const backendBaseUrl = import.meta.env.PROD ? '' : `http://localhost:3131`;
    
    console.log('Environment:', {
        isProd: import.meta.env.PROD,
        backendBaseUrl
    });

    return <APIConfigContext.Provider value={{ backendBaseUrl }}>{children}</APIConfigContext.Provider>;
};