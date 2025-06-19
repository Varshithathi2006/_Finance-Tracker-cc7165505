// TransactionContext.jsx
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://finance-tracker-cc7165505.onrender.com/api/transactions';

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTransactions(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      await axios.post(API_URL, transaction);
      await fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const updateTransaction = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);
      await fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const incomes = transactions.filter(t => t.type === 'income');
  const expenses = transactions.filter(t => t.type === 'expense');

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      editingTransaction,
      setEditingTransaction,
      fetchTransactions,
      loading,
      incomes,
      expenses
    }}>
      {children}
    </TransactionContext.Provider>
  );
}
