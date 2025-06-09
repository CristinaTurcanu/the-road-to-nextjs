import {ThemeProvider as ThemeProviderBase} from 'next-themes';
import React from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProviderBase attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProviderBase>
    );
};   
export default ThemeProvider;