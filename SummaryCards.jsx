import "./SummaryCards.css";

function SummaryCards({ transactions }) {

  // ✅ Cleaner calculation using reduce
  const { income, expense } = transactions.reduce(
    (acc, t) => {
      if (t.type === "income") {
        acc.income += t.amount;
      } else {
        acc.expense += t.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = income - expense;

  return (
    <div className="summary-container">
      <h3>Summary</h3>

      <div className="cards">

        <div className="card balance">
          <h4>Total Balance</h4>
          <p>₹{balance.toLocaleString()}</p>
        </div>

        <div className="card income">
          <h4>Income</h4>
          <p>₹{income.toLocaleString()}</p>
        </div>

        <div className="card expense">
          <h4>Expenses</h4>
          <p>₹{expense.toLocaleString()}</p>
        </div>

      </div>
    </div>
  );
}

export default SummaryCards;