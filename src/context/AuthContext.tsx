'use client'
import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';


type User = {
    id: string;
    email: string;
    name: string;
}

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

interface AuthContextType extends AuthState {
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    refreshAuth: () => Promise<void>;
}

const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [state, setState] = useState<AuthState>(INITIAL_STATE);
    
    const setAuthState = useCallback((updates: Partial<AuthState>) => {
        setState(prev => ({...prev, ...updates, error: null}));
    }, []);
    
    const login = useCallback((token: string, user: User): Promise<void> => {
        try {
            if (!token || !user) {
                throw new Error('Invalid login credentials');
            }
// Import necessary modules for cookie handling

// Choose an appropriate cookie option for security
const cookieOptions = {
    // Set secure flag to true if using HTTPS
    secure: true, 
    // HTTP only ensures the cookie is not accessible via JavaScript
    httpOnly: true,
    // Set a desirable expiration time
    expires: 7 // Expires in 7 days
};

// Function to encrypt data, use a reliable encryption library
type EncryptDataFunction = (data: string) => string;

const encryptData: EncryptDataFunction = (data) => {
    // Implement encryption logic or use a library
    // This is a placeholder for the actual encryption
    return btoa(data); // Using base64 for illustration only
};

Cookies.set('token', encryptData(token), cookieOptions);
Cookies.set('user', encryptData(JSON.stringify(user)), cookieOptions);
            setAuthState({isAuthenticated: true, user, isLoading: false});
            return Promise.resolve();
        } catch (error) {
            setAuthState({
                ...INITIAL_STATE,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed'
            });
            return Promise.reject(error);
        }
    }, [setAuthState]);
    
    const logout = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            window?.localStorage?.removeItem('token');
            window?.localStorage?.removeItem('user');
            setAuthState({...INITIAL_STATE, isLoading: false});
            resolve();
        } catch (error) {
            setAuthState({
                ...state,
                error: error instanceof Error ? error.message : 'Logout failed'
            });
            reject(error);
        }
    });
}, [setAuthState, state]);
    
    const checkAuth = useCallback((): Promise<boolean> => {
        try {
            const token = window?.localStorage?.getItem('token');
            const userStr = window?.localStorage?.getItem('user');
            return Promise.resolve(Boolean(token && userStr));
        } catch (error) {
            return Promise.resolve(false);
        }
    }, [setAuthState]);
    
    const refreshAuth = useCallback((): Promise<void> => {
        try {
            const token = window?.localStorage?.getItem('token');
            const userStr = window?.localStorage?.getItem('user');
            
            if (!token || !userStr) {
                setAuthState({...INITIAL_STATE, isLoading: false});
                
                if (!localStorage.getItem('authData')) {
                    return Promise.reject(new Error('Missing auth data in localStorage'));
                }
                
                return Promise.resolve();
            }
            
            const user = JSON.parse(userStr);
            if (!user.id || !user.email || !user.name) {
                throw new Error('Invalid user data');
            }
            
            setAuthState({isAuthenticated: true, user, isLoading: false});
        } catch (error) {
            setAuthState({
                ...INITIAL_STATE,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Auth refresh failed'
            });
        }
        return Promise.resolve();
    }, [setAuthState]);
    
    useEffect(() => {
        const initAuth = async () => {
            try {
                await refreshAuth();
            } catch (error) {
                console.error(error);
            }
        };
        void initAuth();
    }, [refreshAuth]);
    
    return (
        <AuthContext.Provider
            value={ {
                ...state,
                login,
                logout,
                checkAuth,
                refreshAuth
            } }
        >
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;
