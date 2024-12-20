import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old theme classes
        root.classList.remove('light', 'dark');

        // Add current theme class
        root.classList.add(theme);

        // Save to local storage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme =>
            prevTheme === 'light' ? 'dark' : 'light'
        );
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};