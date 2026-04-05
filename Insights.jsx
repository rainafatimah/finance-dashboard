function Insights({ transactions }) {
  let categoryTotals = {};

  // Calculate total per category
  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += t.amount;
    }
  });

  // Find highest spending category
  let highestCategory = "";
  let maxAmount = 0;

  for (let category in categoryTotals) {
    if (categoryTotals[category] > maxAmount) {
      maxAmount = categoryTotals[category];
      highestCategory = category;
    }
  }
  const monthly = {};

transactions.forEach((t) => {
  const month = t.date.slice(0, 7);

  if (!monthly[month]) {
    monthly[month] = 0;
  }

  if (t.type === "expense") {
    monthly[month] += t.amount;
  }
});

const months = Object.keys(monthly);

let comparison = "";

if (months.length >= 2) {
  const last = monthly[months[months.length - 1]];
  const prev = monthly[months[months.length - 2]];

  if (last > prev) {
    comparison = "📈 Spending increased this month";
  } else {
    comparison = "📉 Spending decreased this month";
  }
}

  return (
    <div>
      <h2>Insights</h2>

      {highestCategory ? (
        <p>
          You spent the most on <strong>{highestCategory}</strong> (₹{maxAmount})
        </p>
      ) : (
        <p>No expense data available</p>
      )}
      <p>{comparison}</p>
    </div>
  );
}

export default Insights;