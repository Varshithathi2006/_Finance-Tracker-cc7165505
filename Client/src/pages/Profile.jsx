import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updateProfile, signOut } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || ''
  });

  // Redirect if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = updateProfile({
      name: formData.name,
      username: formData.username,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3b82f6&color=fff&size=150`
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username
    });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      signOut();
      navigate('/auth');
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-300 min-h-screen">
      <motion.h1 
        className="text-center text-xl md:text-2xl font-bold bg-clip-text text-black mb-10 leading-tight tracking-tight"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Profile
      </motion.h1>

      <motion.div
        className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-400 p-8 text-white text-center">
          <motion.img 
            src={user.avatar} 
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-blue-100">@{user.username}</p>
          <p className="text-sm text-blue-100 mt-2">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          {!isEditing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {user.name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    @{user.username}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {user.email}
                  </p>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="Email cannot be changed"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Email address cannot be changed for security reasons
                  </p>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Account Stats */}
        <div className="bg-gray-50 p-6 border-t">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹0</p>
              <p className="text-sm text-gray-600">Current Balance</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}