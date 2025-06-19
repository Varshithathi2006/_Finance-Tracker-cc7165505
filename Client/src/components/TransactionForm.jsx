import { useState, useEffect } from 'react';
import { useTransactions } from '../components/TransactionContext';
import axios from 'axios';

export default function TransactionForm({ editTransaction, onEditComplete, onCancel }) {
  const { fetchTransactions } = useTransactions();

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const API_URL = 'http://localhost:5000/api/transactions';

  // Pre-populate form when editing
  useEffect(() => {
    if (editTransaction) {
      setText(editTransaction.text);
      setAmount(editTransaction.amount.toString());
      setType(editTransaction.type);
    }
  }, [editTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTransaction) {
        // Update existing transaction
        await axios.put(`${API_URL}/${editTransaction.id}`, {
          text,
          amount: Number(amount),
          type,
        });
        onEditComplete?.(); // Exit edit mode
      } else {
        // Add new transaction
        await axios.post(API_URL, {
          text,
          amount: Number(amount),
          type,
        });

        // Reset form
        setText('');
        setAmount('');
        setType('income');
      }

      // Refresh transaction list
      fetchTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to save transaction. Check your backend, it’s probably taking a nap.');
    }
  };

  const handleCancel = () => {
    if (editTransaction) {
      onCancel?.();
    } else {
      setText('');
      setAmount('');
      setType('income');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Transaction Name
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Rent"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1000"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Transaction Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editTransaction ? 'Update Transaction' : 'Add Transaction'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {editTransaction ? 'Cancel' : 'Clear Form'}
          </button>
        </div>
      </form>
    </div>
  );
}
