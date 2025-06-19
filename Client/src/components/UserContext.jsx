import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data from memory on component mount
  useEffect(() => {
    const userData = getUserFromMemory();
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Simple in-memory storage (replace with actual backend integration)
  const saveUserToMemory = (userData) => {
    // In a real app, this would be an API call
    window.tempUserStorage = userData;
  };

  const getUserFromMemory = () => {
    // In a real app, this would be an API call or localStorage
    return window.tempUserStorage || null;
  };

  const signUp = (userData) => {
    const newUser = {
      id: Date.now(), // Simple ID generation
      name: userData.name,
      email: userData.email,
      username: userData.email.split('@')[0], // Generate username from email
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3b82f6&color=fff&size=150`
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    saveUserToMemory(newUser);
    return newUser;
  };

  const signIn = (credentials) => {
    // In a real app, this would validate against a backend
    const userData = getUserFromMemory();
    if (userData && userData.email === credentials.email) {
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    }
    return null;
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    window.tempUserStorage = null;
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    saveUserToMemory(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};