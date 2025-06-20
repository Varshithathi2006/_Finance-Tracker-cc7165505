import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]); 
  const [editingTransaction, setEditingTransaction] = useState(null);

  const API_URL = 'https://finance-tracker-cc7165505.onrender.com/api/transactions';

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response?.data?.data;

      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.warn('API returned non-array data. Resetting to empty array.');
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]); // Reset to empty array on failure
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

  return (
    <TransactionContext.Provider value={{
      transactions: Array.isArray(transactions) ? transactions : [], // Always safe
      addTransaction,
      updateTransaction,
      deleteTransaction,
      editingTransaction,
      setEditingTransaction,
      fetchTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
}