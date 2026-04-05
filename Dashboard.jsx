import SummaryCards from "../SummaryCards/SummaryCards";
import Charts from "../Charts/Charts";

function Dashboard({ transactions }) {
  return (
    <div className="dashboard">

      <h2>Dashboard</h2>

      {/* Summary Section */}
      <section className="dashboard-section">
        <SummaryCards transactions={transactions} />
      </section>

      {/* Charts Section */}
      <section className="dashboard-section">
        <Charts transactions={transactions} />
      </section>

    </div>
  );
}

export default Dashboard;