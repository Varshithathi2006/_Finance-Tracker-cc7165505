import { useTransactions } from '../components/TransactionContext';

export default function BalanceSummary() {
  const { transactions } = useTransactions();

  const totalBalance = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount);
  }, 0);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Current Balance</h2>
      <p className={`text-4xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        ₹{totalBalance.toFixed(2)}
      </p>
    </div>
  );
}
