import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('user');
    //  // Add robust check for saved data before parsing
    // if (saved && typeof saved === 'string' && saved !== 'undefined') {
    //   try {
    //     return JSON.parse(saved);
    //   } catch (error) {
    //     // If parsing fails (e.g., malformed JSON), log the error and clear the item
    //     console.error("Error parsing user from localStorage:", error);
    //     localStorage.removeItem('user'); // Clear the bad data
    //     return null; // Return null to prevent further issues
    //   }
    // }
    // // If saved is null, empty string, or the literal "undefined" string
    // return null; 
    return saved ? JSON.parse(saved) : undefined;
  });

  const login = (newToken: string, userData: any) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    console.log("Logging Out");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, 
                                   token, 
                                   login, 
                                   logout, 
                                   isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
