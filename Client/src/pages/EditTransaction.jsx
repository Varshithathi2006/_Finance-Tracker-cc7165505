// EditTransaction.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTransactions } from '../components/TransactionContext';
import TransactionForm from './TransactionForm';

export default function EditTransaction() {
  const { transactions, updateTransaction, setEditingTransaction } = useTransactions();
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    const transaction = transactions.find(t => t.id === id || t._id === id);
    if (transaction) {
      setCurrentTransaction(transaction);
      setEditingTransaction(transaction);
    }
  }, [id, transactions, setEditingTransaction]);

  if (!currentTransaction) return <div className="p-6 text-center text-gray-500">Transaction not found!</div>;

  const handleUpdate = (updatedTransaction) => {
    updateTransaction(currentTransaction.id || currentTransaction._id, updatedTransaction);
    navigate('/reports');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Transaction</h1>
      <TransactionForm
        editTransaction={currentTransaction}
        onEditComplete={handleUpdate}
        onCancel={() => navigate('/reports')}
      />
    </div>
  );
}
