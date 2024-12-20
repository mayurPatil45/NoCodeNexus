import React, {
    createContext,
    useState,
    useContext,
    useEffect
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication status on app load
        const checkAuthStatus = async () => {
            try {
                // Replace with your actual token/auth check logic
                const token = localStorage.getItem('authToken');
                if (token) {
                    // Validate token with backend
                    const response = await fetch('/api/validate-token', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        setIsAuthenticated(true);
                    } else {
                        // Token invalid, clear storage
                        localStorage.removeItem('authToken');
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Auth check failed', error);
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                setUser(data.user);
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};