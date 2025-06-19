// TransactionContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const API_URL = 'http://localhost:5000/api/transactions';

  // Load data on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.success) {
        setTransactions(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      const json = await res.json();
      if (json.success) {
        fetchTransactions();
      }
    } catch (error) {
      console.error('Add transaction failed:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTransactions();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const updateTransaction = async (updatedTransaction) => {
    try {
      await fetch(`${API_URL}/${updatedTransaction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTransaction),
      });
      setEditingTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const expenses = transactions.filter((t) => t.type === 'expense');
  const incomes = transactions.filter((t) => t.type === 'income');

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        expenses,
        incomes,
        editingTransaction,
        setEditingTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
