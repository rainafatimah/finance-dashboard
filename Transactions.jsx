import { useState } from "react";

function Transactions({ transactions, setTransactions, role }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ Filter logic
  const filteredData = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : t.type === filter;

    return matchesSearch && matchesFilter;
  });

  // ✅ Add Transaction
  const addTransaction = () => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10), // dynamic date
      amount: 1000,
      category: "New",
      type: "expense",
    };

    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>

      {/* Controls */}
      <div className="controls">

        <input
          type="text"
          placeholder="Search by category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {role === "admin" && (
          <button onClick={addTransaction}>
            + Add Transaction
          </button>
        )}

      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>₹{t.amount.toLocaleString()}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <p className="no-data">No transactions found</p>
      )}
    </div>
  );
}

export default Transactions;