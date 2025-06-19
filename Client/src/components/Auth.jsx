import { useState, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

// User Context that matches your Sidebar expectations
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    // Load users from localStorage on initialization
    const savedUsers = localStorage.getItem('financio_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('financio_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save users to localStorage whenever users array changes
  useEffect(() => {
    localStorage.setItem('financio_users', JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('financio_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('financio_current_user');
    }
  }, [currentUser]);

  const signUp = (userData) => {
    // Check if user already exists
    const existingUser = users.find(user => 
      user.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (existingUser) {
      throw new Error('User with this email already exists!');
    }

    // Generate a username from email
    const username = userData.email.split('@')[0];
    
    // Create avatar URL (using a simple avatar service)
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3b82f6&color=ffffff&size=128`;

    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      email: userData.email.toLowerCase(),
      username: username,
      password: userData.password,
      avatar: avatar,
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const signIn = (credentials) => {
    const user = users.find(u => 
      u.email.toLowerCase() === credentials.email.toLowerCase() && 
      u.password === credentials.password
    );
    
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  // Context value matching what your Sidebar expects
  const contextValue = {
    // For the Auth component
    users,
    currentUser,
    signUp,
    signIn,
    signOut,
    
    // For the Sidebar component (matching its expected structure)
    user: currentUser,
    isAuthenticated: !!currentUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// Simplified Auth Component
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signUp, signIn, currentUser, signOut } = useUser();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        // Sign Up Validation
        if (!formData.name.trim()) {
          throw new Error('Please enter your full name!');
        }
        
        if (!validateEmail(formData.email)) {
          throw new Error('Please enter a valid email address!');
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long!');
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match!');
        }

        const newUser = signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        setSuccess(`Welcome ${newUser.name}! Account created successfully.`);
        
        // Reset form and redirect after a short delay
        setTimeout(() => {
          setFormData({ email: '', password: '', confirmPassword: '', name: '' });
          window.location.href = '/';
        }, 1500);

      } else {
        // Sign In Validation
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields!');
        }

        if (!validateEmail(formData.email)) {
          throw new Error('Please enter a valid email address!');
        }

        const user = signIn({
          email: formData.email,
          password: formData.password
        });

        if (user) {
          setSuccess(`Welcome back, ${user.name}!`);
          
          // Reset form and redirect after a short delay
          setTimeout(() => {
            setFormData({ email: '', password: '', confirmPassword: '', name: '' });
            window.location.href = '/';
          }, 1500);
        } else {
          throw new Error('Invalid email or password. Please check your credentials.');
        }
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  // If user is already logged in, show a simple dashboard
  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            
            <motion.h1
              className="text-2xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Welcome, {currentUser.name}!
            </motion.h1>
            
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              @{currentUser.username} • {currentUser.email}
            </motion.p>

            <motion.button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-500 transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Go to Dashboard
            </motion.button>

            <motion.button
              onClick={signOut}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Sign Out
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">F</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Financio</h1>
          <p className="text-gray-600">
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              key="success"
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatePresence>
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={isSignUp ? "Create a password (min 6 characters)" : "Enter your password"}
                disabled={loading}
                minLength={isSignUp ? "6" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-500 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </motion.button>
        </motion.form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            onClick={toggleMode}
            disabled={loading}
            className="mt-2 text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200 disabled:opacity-50"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Updated UserContext component that can be used in your app
export { UserProvider, useUser };

// Main component
export default function App() {
  return (
    <UserProvider>
      <Auth />
    </UserProvider>
  );
}