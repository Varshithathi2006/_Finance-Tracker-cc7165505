import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../components/TransactionContext';

export default function IncomeChart() {
  const { incomes } = useTransactions();

  // Group incomes by transaction name
  const incomeSummary = incomes.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.text);
    if (existing) {
      existing.value += Number(curr.amount); // Convert to number to ensure correct addition
    } else {
      acc.push({ name: curr.text, value: Number(curr.amount) });
    }
    return acc;
  }, []);

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#00BCD4', '#8BC34A'];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-center mb-4">Income Distribution</h3>
      {incomeSummary.length === 0 ? (
        <p className="text-center">No income data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={incomeSummary}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#4CAF50"
              label
            >
              {incomeSummary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
