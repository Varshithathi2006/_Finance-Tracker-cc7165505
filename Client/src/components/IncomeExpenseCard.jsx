import { useTransactions } from '../components/TransactionContext';

export default function IncomeExpenseCard() {
  const { transactions } = useTransactions();

   const totalIncome = Array.isArray(transactions) && transactions.length >0 ? Transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t?.amount|| 0),0) : 0;

  const totalExpenses = Array.isArray(transactions) && transactions.length >0 ? Transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t?.amount|| 0),0) : 0;
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 gap-4 text-center">
      {/* Income Card */}
      <div className="p-4 border-r-2">
        <h3 className="text-xl font-medium text-gray-600 mb-2">Income</h3>
        <p className="text-3xl font-bold text-green-500">₹{income}</p>
      </div>

      {/* Expense Card */}
      <div className="p-4">
        <h3 className="text-xl font-medium text-gray-600 mb-2">Expenses</h3>
        <p className="text-3xl font-bold text-red-500">₹{expenses}</p>
      </div>
    </div>
  );
}
