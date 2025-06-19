import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTransactions } from '../components/TransactionContext';

export default function ExpenseChart() {
  const { expenses } = useTransactions();

  // Group expenses by transaction name
  const expenseSummary = expenses.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.text);
    if (existing) {
      existing.value += Number(curr.amount); // Make sure you're adding numbers
    } else {
      acc.push({ name: curr.text, value: Number(curr.amount) });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#7E57C2', '#26A69A'];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-center mb-4">Expense Distribution</h3>
      {expenseSummary.length === 0 ? (
        <p className="text-center">No expense data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseSummary}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {expenseSummary.map((entry, index) => (
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
