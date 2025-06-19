import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransactions } from '../components/TransactionContext';

export default function Reports() {
  const { transactions = [], deleteTransaction, expenses = [], incomes = [] } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // 🛡️ Null-safe reduce
  const totalIncome = incomes.reduce((sum, transaction) => sum + (transaction?.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, transaction) => sum + (transaction?.amount || 0), 0);
  const balance = totalIncome - totalExpenses;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterType('all');
    setSortBy('date');
    setSortOrder('desc');
  };

  // ✅ Search and Filter
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction?.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction?.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || transaction?.type === filterType;

    return matchesSearch && matchesType;
  });

  // ✅ Sorting with proper ascending/descending logic
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'amount':
        comparison = (a?.amount || 0) - (b?.amount || 0);
        break;

      case 'description':
        const aDesc = (a?.text || a?.description || '').toLowerCase();
        const bDesc = (b?.text || b?.description || '').toLowerCase();
        comparison = aDesc.localeCompare(bDesc);
        break;

      case 'date':
      default:
        const aDate = a?.date ? new Date(a.date) : new Date();
        const bDate = b?.date ? new Date(b.date) : new Date();
        comparison = aDate - bDate;
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* 🔍 Search and Filter */}
      <div className="bg-white text-black rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="description">Sort by Description</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {(searchTerm || filterType !== 'all' || sortBy !== 'date' || sortOrder !== 'desc') && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {sortedTransactions.length} of {transactions.length} transactions
            </div>
            <button
              onClick={handleClearSearch}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* 📋 Transactions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">All Transactions</h2>
        </div>

        {sortedTransactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            {transactions.length === 0 ? (
              <>No transactions found. <Link to="/" className="text-blue-500 hover:underline">Add your first transaction</Link></>
            ) : (
              <>No transactions match your current filters. <button onClick={handleClearSearch} className="text-blue-500 hover:underline">Clear filters</button></>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTransactions.map((transaction) => (
                  <tr key={transaction?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {transaction?.date ? new Date(transaction.date).toLocaleDateString('en-IN') : 'No date'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction?.text || transaction?.description || 'No description'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction?.type === 'income'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction?.type?.charAt(0).toUpperCase() + transaction?.type?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`${transaction?.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction?.type === 'income' ? '+' : '-'}₹{transaction?.amount?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        to={`/edit-transaction/${transaction?._id}`}
                        className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded transition duration-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(transaction?._id)}
                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ➕ Add New Transaction Button */}
      <div className="mt-6 flex justify-center">
        <Link
          to="/"
          className="bg-blue-200 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add New Transaction
        </Link>
      </div>
    </div>
  );
}
