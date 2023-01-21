import React, { ReactElement, useContext, useState } from "react"

const ThemeContext = React.createContext<boolean>(false);

interface ThemeUpdateContextValue {
    toggleTheme(): void,
}
const ThemeUpdateContext = React.createContext<ThemeUpdateContextValue>({ toggleTheme: () => { } });

// Exposing custom hooks
export const useTheme = () => useContext(ThemeContext)
export const useThemeUpdate = () => useContext(ThemeUpdateContext);

interface ThemeProviderProps {
    children: React.ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }): ReactElement => {

    const [darkTheme, setDarkTheme] = useState(false);

    const toggleTheme = (): void =>  setDarkTheme(prevDarkTheme => !prevDarkTheme);

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={{ toggleTheme }}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;