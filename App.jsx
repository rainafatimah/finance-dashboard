import { useState } from "react";
import "./App.css";

import SummaryCards from "./components/SummaryCards/SummaryCards";
import Charts from "./components/Charts/Charts";
import Transactions from "./components/Transactions/Transactions";
import Insights from "./components/Insights/Insights";

import { transactions as initialData } from "./data/mockData";

function App() {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState(initialData);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="app-container">

        {/* 🔥 NAVBAR */}
        <div className="navbar">
          <h2>💰 Finance Dashboard</h2>

          <div className="nav-actions">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <section>
          <SummaryCards transactions={transactions} />
        </section>

        {/* CHARTS */}
        <section>
          <Charts transactions={transactions} />
        </section>

        {/* TRANSACTIONS */}
        <section>
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
            role={role}
          />
        </section>

        {/* INSIGHTS */}
        <section>
          <Insights transactions={transactions} />
        </section>

      </div>
    </div>
  );
}

export default App;