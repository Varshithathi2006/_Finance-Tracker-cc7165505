import { useTransactions } from './TransactionContext';

export default function TransactionList() {
  const { transactions, deleteTransaction, setEditingTransaction } = useTransactions();

  if (transactions.length === 0) {
    return <div className="text-center text-gray-500">No transactions available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center mb-3 p-3 border-b">
            <div>
              <h4 className="font-semibold">{transaction.text}</h4>
              <p className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                ₹{transaction.amount} ({transaction.type})
              </p>
            </div>
            <div className="flex space-x-2">
              
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
