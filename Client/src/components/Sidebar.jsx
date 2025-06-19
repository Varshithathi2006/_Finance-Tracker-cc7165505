import { Link } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const { user, isAuthenticated, signOut } = useUser();

  const handleSignOut = () => {
    signOut();
    // Redirect to auth page or home
    window.location.href = '/auth';
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-4 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Financio
      </h2>

      {/* Profile Section */}
      {isAuthenticated && user ? (
        <motion.div 
          className="bg-gray-800 rounded-lg p-4 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-blue-400"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-00 truncate">
                @{user.username}
              </p>
            </div>
          </div>
          <Link 
            to="/profile" 
            className="block text-center  bg-blue-100 hover:bg-blue-700 text-black text-sm py-2 px-3 rounded transition-colors duration-200"
          >
            View Profile
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          className="bg-gray-800 rounded-lg p-4 mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-300 mb-3">Welcome to Financio!</p>
          <Link 
            to="/auth" 
            className="block bg-black hover:from-blue-700 hover:to-green-500 text-white text-sm py-2 px-3 rounded transition-all duration-200"
          >
            Sign In / Sign Up
          </Link>
        </motion.div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold mb-3 text-gray-300">Menu</h3>
        
        <Link 
          to="/" 
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200 group"
        >
          <span className="text-blue-400 group-hover:text-blue-300">🏠</span>
          <span>Home</span>
        </Link>
        
        <Link 
          to="/add-expense" 
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200 group"
        >
          <span className="text-red-400 group-hover:text-red-300">💸</span>
          <span>Add Expense</span>
        </Link>
        
        <Link 
          to="/add-income" 
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200 group"
        >
          <span className="text-green-400 group-hover:text-green-300">💰</span>
          <span>Add Income</span>
        </Link>
        
        <Link 
          to="/reports" 
          className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200 group"
        >
          <span className="text-purple-400 group-hover:text-purple-300">📊</span>
          <span>Reports</span>
        </Link>

        {isAuthenticated && (
          <Link 
            to="/profile" 
            className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200 group"
          >
            <span className="text-yellow-400 group-hover:text-yellow-300">👤</span>
            <span>Profile</span>
          </Link>
        )}
      </nav>

      {/* Sign Out Button */}
      {isAuthenticated && (
        <motion.button
          onClick={handleSignOut}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign Out
        </motion.button>
      )}
    </div>
  );
}