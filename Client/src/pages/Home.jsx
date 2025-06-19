import { useState } from 'react';
import { useUser } from '../components/UserContext';
import BalanceSummary from '../components/BalanceSummary';
import ExpenseChart from '../components/ExpenseChart';
import IncomeChart from '../components/IncomeChart';
import IncomeExpenseCard from '../components/IncomeExpenseCard';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { useTransactions } from '../components/TransactionContext'; // ✅ Correct path

export default function Home() {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { transactions } = useTransactions();
  const { currentUser, signOut } = useUser();

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditComplete = () => {
    setEditingTransaction(null);
  };

  const handleSignOut = () => {
    signOut();
    setShowProfileDropdown(false);
  };

  const handleExportData = () => {
    if (transactions.length === 0) {
      alert('No transactions to export!');
      return;
    }

    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];

    const csvData = transactions.map(transaction => [
      new Date(transaction.date).toLocaleDateString('en-IN'),
      `"${transaction.description}"`,
      transaction.category,
      transaction.type,
      transaction.amount
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpenses;

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Personal Finance Tracker
              </h1>
              <p className="text-gray-600 text-lg">
                Take control of your finances with smart tracking and insights
              </p>
            </div>

            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-4 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {getUserInitials(currentUser.name)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">
                      {currentUser.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentUser.email}
                    </div>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {getUserInitials(currentUser.name)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {currentUser.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {currentUser.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          console.log('Navigate to profile');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          console.log('Navigate to settings');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <span>Settings</span>
                      </button>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentUser && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome back, {currentUser.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-gray-600">
              Here's your financial overview for today. Keep tracking to reach your goals!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              ₹{totalIncome.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Income</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              ₹{totalExpenses.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Expenses</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className={`text-2xl font-bold mb-1 ${netSavings >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              ₹{netSavings.toLocaleString()}
            </div>
            <div className="text-gray-600">Net Balance</div>
          </div>
        </div>

        <div className="space-y-8 mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Transaction Management
            </h2>
            <div className="space-y-6">
              <TransactionForm 
                editTransaction={editingTransaction}
                onEditComplete={handleEditComplete}
              />
              <TransactionList 
                onEditTransaction={handleEditTransaction}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Financial Overview
            </h2>
            <p className="text-gray-600">
              Get insights into your spending patterns and financial health
            </p>
          </div>

          <BalanceSummary />

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <IncomeExpenseCard />
            <ExpenseChart />
            <IncomeChart />
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Ready to Dive Deeper?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore detailed reports and analytics to better understand your financial patterns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/reports'}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              View Reports
            </button>
            <button 
              onClick={handleExportData}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Export Data
            </button>
          </div>
        </div>
      </div>

      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </div>
  );
}
