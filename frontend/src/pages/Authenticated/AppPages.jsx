import { Link } from "react-router-dom";
import { getSession } from "../../services/authService";
import { useEffect, useState } from "react";
import "./AppPages.css";

const portfolio = [
  {
    id: 1,
    property: "Chandrayan Heights",
    tokens: "120",
    value: "₹66,000",
    return: "+12.4%",
  },
  {
    id: 5,
    property: "Marina Bay Towers",
    tokens: "80",
    value: "₹40,000",
    return: "+15.1%",
  },
  {
    id: 2,
    property: "Skyline Business Park",
    tokens: "50",
    value: "₹30,000",
    return: "+10.8%",
  },
];

export function Dashboard() {
  const name = getSession()?.user?.full_name?.split(" ")[0] || "Investor";

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const session = getSession();

        if (!session?.token) {
          setError("Please login again.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load dashboard."
          );
        }

        setDashboard(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <section className="app-hero">
          <p className="eyebrow">YOUR INVESTMENT SPACE</p>

          <h1>Welcome back, {name}.</h1>

          <p>Loading your investment dashboard...</p>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <section className="app-hero">
          <p className="eyebrow">YOUR INVESTMENT SPACE</p>

          <h1>Welcome back, {name}.</h1>

          <p>{error}</p>
        </section>
      </>
    );
  }

  const balance = Number(dashboard?.wallet?.balance || 0);
  const invested = Number(
    dashboard?.wallet?.invested_amount || 0
  );

  const tokens = Number(
    dashboard?.portfolio?.total_tokens || 0
  );

  const properties = Number(
    dashboard?.portfolio?.properties_owned || 0
  );

  const recentTransactions =
    dashboard?.recent_transactions || [];

  return (
    <>
      <section className="app-hero">
        <p className="eyebrow">YOUR INVESTMENT SPACE</p>

        <h1>Welcome back, {name}.</h1>

        <p>
          Track your real-estate investments and discover your next opportunity.
        </p>

        <Link className="primary-action" to="/marketplace">
          Explore marketplace →
        </Link>
      </section>

      <section className="stat-grid">
        <Stat
          label="Total invested"
          value={`₹${invested.toLocaleString("en-IN")}`}
          note="Actual investment amount"
        />

        <Stat
          label="Properties owned"
          value={properties}
          note="Fractional ownership"
        />

        <Stat
          label="Tokens owned"
          value={tokens.toLocaleString("en-IN")}
          note="Fractional ownership"
        />

        <Stat
          label="Available balance"
          value={`₹${balance.toLocaleString("en-IN")}`}
          note="Available to invest"
        />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h2>Portfolio summary</h2>
            </div>
          </div>

          <div className="chart">
            <span>
              ₹{invested.toLocaleString("en-IN")}
            </span>

            <svg viewBox="0 0 600 180" preserveAspectRatio="none">
              <path
                d="M0 145 C70 120 85 132 145 108 S215 122 275 85 S375 110 420 58 S505 90 600 28"
                fill="none"
                stroke="#2f855a"
                strokeWidth="5"
              />

              <path
                d="M0 145 C70 120 85 132 145 108 S215 122 275 85 S375 110 420 58 S505 90 600 28 V180 H0Z"
                fill="rgba(47,133,90,.10)"
              />
            </svg>

            <div className="chart-months">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">ACTIVITY</p>
              <h2>Recent transactions</h2>
            </div>

            <Link to="/transactions">View all</Link>
          </div>

          {recentTransactions.length === 0 ? (
            <p>No recent transactions.</p>
          ) : (
            recentTransactions.map((transaction) => (
              <Activity
                key={transaction.id}
                title="Investment confirmed"
                detail={`${transaction.property} · ${transaction.tokens} tokens`}
                amount={`₹${Number(
                  transaction.amount
                ).toLocaleString("en-IN")}`}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export function Portfolio() {
  const [investments, setInvestments] = useState([]);
  const [summary, setSummary] = useState({
    total_invested: "0.00",
    total_tokens: "0",
    total_investments: "0",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const session = getSession();

        if (!session?.token) {
          setError("Please login again.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/portfolio",
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load portfolio."
          );
        }

        setInvestments(data.investments || []);
        setSummary(
          data.summary || {
            total_invested: "0.00",
            total_tokens: "0",
            total_investments: "0",
          }
        );
      } catch (error) {
        console.error("Portfolio error:", error);
        setError("Unable to load portfolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const totalInvested = Number(summary.total_invested || 0);
  const totalTokens = Number(summary.total_tokens || 0);
  const totalInvestments = Number(
    summary.total_investments || 0
  );

  const uniqueProperties = new Set(
    investments.map((item) => item.property_id)
  ).size;

  return (
    <Page title="Your portfolio" eyebrow="OWNERSHIP">
      <p className="page-intro">
        A clear view of every fractional property investment you own.
      </p>

      {loading && (
        <div className="panel">
          <p>Loading portfolio...</p>
        </div>
      )}

      {error && (
        <div className="panel">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="stat-grid portfolio-stats">
            <Stat
              label="Total invested"
              value={`₹${totalInvested.toLocaleString("en-IN")}`}
              note="Actual investment amount"
            />

            <Stat
              label="Tokens owned"
              value={totalTokens.toLocaleString("en-IN")}
              note="Across your investments"
            />

            <Stat
              label="Properties owned"
              value={uniqueProperties}
              note="Fractional ownership"
            />

            <Stat
              label="Investments"
              value={totalInvestments}
              note="Completed investments"
            />
          </div>

          <InvestmentTable investments={investments} />
        </>
      )}
    </Page>
  );
}

function InvestmentTable({ investments }) {
  return (
    <div className="panel table-panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">YOUR INVESTMENTS</p>
          <h2>Property holdings</h2>
        </div>

        <Link to="/marketplace">
          Add investment →
        </Link>
      </div>

      {investments.length === 0 ? (
        <p className="page-intro">
          You don't have any investments yet.
        </p>
      ) : (
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Tokens</th>
                <th>Invested amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {investments.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.property}</strong>
                    <br />
                    <small>{item.location}</small>
                  </td>

                  <td>{item.tokens}</td>

                  <td>
                    ₹
                    {Number(
                      item.invested_amount
                    ).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span className="status">
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/property/${item.property_id}`}
                      className="portfolio-view-link"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function InvestmentDetails({
  tokens,
  invested,
  current,
  roi,
  gain,
}) {
  return (
    <div className="investment-details-grid">
      <div>
        <span>Tokens owned</span>
        <strong>{tokens}</strong>
      </div>

      <div>
        <span>Amount invested</span>
        <strong>{invested}</strong>
      </div>

      <div>
        <span>Current value</span>
        <strong>{current}</strong>
      </div>

      <div>
        <span>ROI</span>
        <strong className="positive">{roi}</strong>
      </div>

      <div>
        <span>Total gain</span>
        <strong className="positive">{gain}</strong>
      </div>
    </div>
  );
}

export function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();

    const fetchWallet = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/wallet",
          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch wallet."
          );
        }

        setWallet(data.wallet);
      } catch (err) {
        console.error("Wallet fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  if (loading) {
    return (
      <Page title="Wallet" eyebrow="YOUR BALANCE">
        <p>Loading wallet...</p>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Wallet" eyebrow="YOUR BALANCE">
        <p>{error}</p>
      </Page>
    );
  }

  const balance = Number(wallet?.balance || 0);
  const invested = Number(wallet?.invested_amount || 0);

  return (
    <Page title="Wallet" eyebrow="YOUR BALANCE">
      <div className="wallet-card">
        <p>Available balance</p>

        <strong>
          ₹
          {balance.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </strong>

        <span>Use your wallet to reserve property tokens.</span>

        <div>
          <button className="primary-action">
            Add funds
          </button>

          <button className="secondary-action">
            Withdraw
          </button>
        </div>
      </div>

      <div className="panel wallet-details">
        <h2>Wallet details</h2>

        <Row
          label="Invested amount"
          value={`₹${invested.toLocaleString("en-IN")}`}
        />

        <Row
          label="Available to invest"
          value={`₹${balance.toLocaleString("en-IN")}`}
        />

        <Row
          label="Wallet status"
          value="Active"
        />
      </div>
    </Page>
  );
}

export function Transactions() {
  return (
    <Page title="Transactions" eyebrow="ACCOUNT ACTIVITY">
      <p className="page-intro">
        View your investment transactions and property token purchases in one place.
      </p>

      <div className="panel">
        <TransactionTable />
      </div>
    </Page>
  );
}

export function Certificates() {
  return (
    <Page
      title="Ownership certificates"
      eyebrow="VERIFIED RECORDS"
    >
      <p className="page-intro">
        Download your proof of fractional ownership for each confirmed
        investment.
      </p>

      <div className="certificate-grid">
        {portfolio.map((item, index) => (
          <article
            className="certificate"
            key={item.property}
          >
            <span>OWNBIT</span>

            <h2>{item.property}</h2>

            <p>Fractional ownership certificate</p>

            <small>
              Certificate ID: OBT-2026-00{index + 1}
            </small>

            <button className="secondary-action">
              View certificate
            </button>
          </article>
        ))}
      </div>
    </Page>
  );
}

export function Profile() {
  const user = getSession()?.user;

  return (
    <Page title="Profile" eyebrow="ACCOUNT SETTINGS">
      <div className="profile-card">
        <div className="avatar">
          {user?.full_name?.[0] || "U"}
        </div>

        <div>
          <h2>{user?.full_name}</h2>

          <p>{user?.email}</p>

          <span className="role-badge">
            Verified investor
          </span>
        </div>
      </div>

      <div className="panel profile-details">
        <h2>Account details</h2>

        <Row
          label="Full name"
          value={user?.full_name || "—"}
        />

        <Row
          label="Email address"
          value={user?.email || "—"}
        />

        <Row
          label="Account status"
          value="Active"
        />
      </div>
    </Page>
  );
}

function Page({ title, eyebrow, children }) {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">{eyebrow}</p>

        <h1>{title}</h1>
      </header>

      {children}
    </>
  );
}

function Stat({ label, value, note }) {
  return (
    <article className="stat-card">
      <p>{label}</p>

      <strong>{value}</strong>

      <span>{note}</span>
    </article>
  );
}

function Activity({
  title,
  detail,
  amount,
  positive,
}) {
  return (
    <div className="activity">
      <div className="activity-icon">
        {positive ? "↗" : "⌁"}
      </div>

      <div>
        <strong>{title}</strong>

        <p>{detail}</p>
      </div>

      <span className={positive ? "positive" : ""}>
        {amount}
      </span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch transactions."
          );
        }

        setTransactions(data.transactions);
      } catch (err) {
        console.error(
          "Transactions fetch error:",
          err
        );

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (transactions.length === 0) {
    return <p>No transactions found.</p>;
  }

  return (
    <div className="responsive-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Details</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => {
            const date = new Date(
              transaction.created_at
            );

            const formattedDate =
              date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

            const amount = Number(
              transaction.amount
            );

            return (
              <tr key={transaction.id}>
                <td>{formattedDate}</td>

                <td>Investment</td>

                <td>
                  {transaction.property}
                  <br />
                  <small>
                    {transaction.tokens} tokens
                  </small>
                </td>

                <td>
                  −₹
                  {amount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </td>

                <td>
                  <span className="status">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 