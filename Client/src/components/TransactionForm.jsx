// TransactionForm.jsx
import { useState, useEffect } from 'react';
import { useTransactions } from '../components/TransactionContext';

export default function TransactionForm({ editTransaction, onEditComplete, onCancel }) {
  const { addTransaction } = useTransactions();

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  useEffect(() => {
    if (editTransaction) {
      setText(editTransaction.text || '');
      setAmount(editTransaction.amount || '');
      setType(editTransaction.type || 'income');
    }
  }, [editTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: parseFloat(amount),
      type,
      date: new Date()
    };

    if (editTransaction) {
      onEditComplete(newTransaction);
    } else {
      addTransaction(newTransaction);
      setText('');
      setAmount('');
      setType('income');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Transaction Description</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          {editTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {editTransaction && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}