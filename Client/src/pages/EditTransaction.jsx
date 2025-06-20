import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTransactions } from '../components/TransactionContext';
import TransactionForm from '../components/TransactionForm';

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, fetchTransactions, setEditingTransaction } = useTransactions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (transactions.length === 0) {
        await fetchTransactions(); 
      }
      setLoading(false);
    };
    loadData();
  }, [transactions, fetchTransactions]);

  const transaction = transactions.find((t) => t._id === id);

  useEffect(() => {
    if (transaction) {
      setEditingTransaction(transaction);
    }
  }, [transaction, setEditingTransaction]);

  const handleEditComplete = () => {
    setEditingTransaction(null);
    navigate('/reports');
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    navigate('/reports');
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!transaction) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Transaction not found!
          <button
            onClick={() => navigate('/reports')}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate('/reports')}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          ← Back to Reports
        </button>
      </div>
      <TransactionForm
        editTransaction={transaction}
        onEditComplete={handleEditComplete}
        onCancel={handleCancel}
      />
    </div>
  );
}
