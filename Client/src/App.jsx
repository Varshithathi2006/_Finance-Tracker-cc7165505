import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import AddIncome from './pages/AddIncome';
import EditTransaction from './pages/EditTransaction';
import Reports from './pages/Reports';
import Auth from './components/Auth'; // Updated auth component
import Profile from './pages/Profile'; // New profile page
import AboutUs from './pages/AboutUs';
import { TransactionProvider } from './components/TransactionContext';
import { UserProvider } from './components/UserContext'; // New user context
import './App.css';

function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/edit-transaction/:id" element={<EditTransaction />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <TransactionProvider>
        <Router>
          <Routes>
            {/* Routes inside authenticated layout */}
            <Route path="/*" element={<AppLayout />} />

            {/* Authentication page outside layout */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Keep your existing auth routes for backward compatibility */}
            <Route path="/signin" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </UserProvider>
  );
}

export default App;