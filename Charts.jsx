import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend, CartesianGrid,
  ResponsiveContainer
} from "recharts";

function Charts({ transactions }) {

  // ✅ Monthly Expense Data (Sorted)
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    if (t.type === "expense") {
      monthlyData[month] += t.amount;
    }
  });

  const lineData = Object.keys(monthlyData)
    .sort() // ✅ ensures Jan → Feb → Mar order
    .map((key) => ({
      name: key,
      amount: monthlyData[key],
    }));


  // ✅ Category-wise Expense Data
  const categoryData = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));


  const COLORS = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b"];

  return (
    <div>
      <h2>Analytics</h2>

      <div className="charts-container">

        {/* 📈 Line Chart */}
        <div className="card">
          <h3>Monthly Expenses</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>


        {/* 🥧 Pie Chart */}
        <div className="card">
          <h3>Expenses by Category</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}

export default Charts;