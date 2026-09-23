import { Link } from "react-router-dom";
import { getSession } from "../../services/authService";
import { useState } from "react";
import "./AppPages.css";

const portfolio = [
  {
    property: "Chandrayan Heights",
    tokens: "120",
    value: "₹66,000",
    return: "+12.4%",
  },
  {
    property: "Marina Bay Towers",
    tokens: "80",
    value: "₹40,000",
    return: "+15.1%",
  },
  {
    property: "Skyline Business Park",
    tokens: "50",
    value: "₹30,000",
    return: "+10.8%",
  },
];

export function Dashboard() {
  const name =
    getSession()?.user?.full_name?.split(" ")[0] || "Investor";

  return (
    <>
      <section className="app-hero">
        <p className="eyebrow">YOUR INVESTMENT SPACE</p>

        <h1>Welcome back, {name}.</h1>

        <p>
          Track your real-estate investments and discover your next
          opportunity.
        </p>

        <Link className="primary-action" to="/marketplace">
          Explore marketplace →
        </Link>
      </section>

      <section className="stat-grid">
        <Stat
          label="Portfolio value"
          value="₹1,36,000"
          note="↑ 12.8% this year"
        />

        <Stat
          label="Properties owned"
          value="3"
          note="Across 3 cities"
        />

        <Stat
          label="Tokens owned"
          value="250"
          note="Fractional ownership"
        />

        <Stat
          label="Projected annual return"
          value="₹17,020"
          note="Based on current holdings"
        />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">OVERVIEW</p>
              <h2>Portfolio performance</h2>
            </div>

            <span className="positive">+12.8%</span>
          </div>

          <div className="chart">
            <span>₹1.36L</span>

            <svg
              viewBox="0 0 600 180"
              preserveAspectRatio="none"
            >
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

          <Activity
            title="Investment confirmed"
            detail="Marina Bay Towers · 80 tokens"
            amount="₹40,000"
          />

          <Activity
            title="Dividend received"
            detail="Chandrayan Heights"
            amount="+₹1,150"
            positive
          />

          <Activity
            title="Investment confirmed"
            detail="Skyline Business Park · 50 tokens"
            amount="₹30,000"
          />
        </div>
      </section>
    </>
  );
}

export function Portfolio() {
  return (
    <Page title="Your portfolio" eyebrow="OWNERSHIP">
      <p className="page-intro">
        A clear view of every fractional property investment you own.
      </p>

      <div className="stat-grid portfolio-stats">
        <Stat
          label="Total invested"
          value="₹1,20,000"
          note="Across 250 tokens"
        />

        <Stat
          label="Current value"
          value="₹1,36,000"
          note="Current portfolio value"
        />

        <Stat
          label="Total gain"
          value="+₹16,000"
          note="+13.3% overall gain"
        />

        <Stat
          label="Avg. annual ROI"
          value="14.2%"
          note="Projected return"
        />
      </div>

      <div className="portfolio-overview">
        <div className="panel portfolio-performance">
          <div className="section-title">
            <div>
              <p className="eyebrow">PERFORMANCE</p>
              <h2>Portfolio growth</h2>
            </div>

            <span className="positive">+13.3%</span>
          </div>

          <div className="portfolio-value">
            <span>Current portfolio value</span>
            <strong>₹1.36L</strong>
          </div>

          <div className="portfolio-chart">
            <svg
              viewBox="0 0 700 220"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="portfolioFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2f855a"
                    stopOpacity="0.22"
                  />
                  <stop
                    offset="100%"
                    stopColor="#2f855a"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d="M0 175
                   C70 160 90 165 145 145
                   S230 155 285 120
                   S370 130 425 95
                   S505 105 555 65
                   S635 75 700 28
                   V220 H0Z"
                fill="url(#portfolioFill)"
              />

              <path
                d="M0 175
                   C70 160 90 165 145 145
                   S230 155 285 120
                   S370 130 425 95
                   S505 105 555 65
                   S635 75 700 28"
                fill="none"
                stroke="#2f855a"
                strokeWidth="5"
              />
            </svg>
          </div>

          <div className="chart-months">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Now</span>
          </div>
        </div>

        <div className="panel portfolio-breakdown">
          <div className="section-title">
            <div>
              <p className="eyebrow">ALLOCATION</p>
              <h2>Investment breakdown</h2>
            </div>
          </div>

          <div className="allocation-item">
            <div className="allocation-info">
              <span>Chandrayan Heights</span>
              <strong>49%</strong>
            </div>

            <div className="allocation-bar">
              <span style={{ width: "49%" }} />
            </div>
          </div>

          <div className="allocation-item">
            <div className="allocation-info">
              <span>Marina Bay Towers</span>
              <strong>29%</strong>
            </div>

            <div className="allocation-bar">
              <span style={{ width: "29%" }} />
            </div>
          </div>

          <div className="allocation-item">
            <div className="allocation-info">
              <span>Skyline Business Park</span>
              <strong>22%</strong>
            </div>

            <div className="allocation-bar">
              <span style={{ width: "22%" }} />
            </div>
          </div>

          <div className="allocation-total">
            <span>Properties owned</span>
            <strong>3</strong>
          </div>

          <div className="allocation-total">
            <span>Tokens owned</span>
            <strong>250</strong>
          </div>
        </div>
      </div>

      <InvestmentTable />
    </Page>
  );
}

function InvestmentTable() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <>
      <div className="panel table-panel portfolio-holdings">
        <div className="section-title">
          <div>
            <p className="eyebrow">YOUR INVESTMENTS</p>
            <h2>Property holdings</h2>
          </div>

          <Link to="/marketplace">
            Add investment →
          </Link>
        </div>

        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Tokens</th>
                <th>Invested</th>
                <th>Current value</th>
                <th>ROI</th>
                <th>Gain</th>
              </tr>
            </thead>

            <tbody>
              <tr
                className={
                  selectedProperty === "Chandrayan Heights"
                    ? "selected-property"
                    : ""
                }
                onClick={() =>
                  setSelectedProperty("Chandrayan Heights")
                }
              >
                <td>
                  <div className="portfolio-property">
                    <div className="property-placeholder">
                      CH
                    </div>

                    <div>
                      <strong>Chandrayan Heights</strong>
                      <span>Residential</span>
                    </div>
                  </div>
                </td>

                <td>120</td>
                <td>₹60,000</td>
                <td>₹66,000</td>
                <td className="positive">+12.4%</td>
                <td className="positive">+₹6,000</td>
              </tr>

              <tr
                className={
                  selectedProperty === "Marina Bay Towers"
                    ? "selected-property"
                    : ""
                }
                onClick={() =>
                  setSelectedProperty("Marina Bay Towers")
                }
              >
                <td>
                  <div className="portfolio-property">
                    <div className="property-placeholder">
                      MB
                    </div>

                    <div>
                      <strong>Marina Bay Towers</strong>
                      <span>Residential</span>
                    </div>
                  </div>
                </td>

                <td>80</td>
                <td>₹35,000</td>
                <td>₹40,000</td>
                <td className="positive">+15.1%</td>
                <td className="positive">+₹5,000</td>
              </tr>

              <tr
                className={
                  selectedProperty === "Skyline Business Park"
                    ? "selected-property"
                    : ""
                }
                onClick={() =>
                  setSelectedProperty(
                    "Skyline Business Park"
                  )
                }
              >
                <td>
                  <div className="portfolio-property">
                    <div className="property-placeholder">
                      SB
                    </div>

                    <div>
                      <strong>Skyline Business Park</strong>
                      <span>Commercial</span>
                    </div>
                  </div>
                </td>

                <td>50</td>
                <td>₹25,000</td>
                <td>₹30,000</td>
                <td className="positive">+10.8%</td>
                <td className="positive">+₹5,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="portfolio-table-hint">
          Click a property to view its investment details.
        </p>
      </div>

      {selectedProperty && (
        <div className="panel selected-investment">
          <div className="section-title">
            <div>
              <p className="eyebrow">SELECTED INVESTMENT</p>
              <h2>{selectedProperty}</h2>
            </div>

            <button
              type="button"
              className="close-investment"
              onClick={() => setSelectedProperty(null)}
            >
              ×
            </button>
          </div>

          {selectedProperty === "Chandrayan Heights" && (
            <InvestmentDetails
              tokens="120"
              invested="₹60,000"
              current="₹66,000"
              roi="+12.4%"
              gain="+₹6,000"
            />
          )}

          {selectedProperty === "Marina Bay Towers" && (
            <InvestmentDetails
              tokens="80"
              invested="₹35,000"
              current="₹40,000"
              roi="+15.1%"
              gain="+₹5,000"
            />
          )}

          {selectedProperty === "Skyline Business Park" && (
            <InvestmentDetails
              tokens="50"
              invested="₹25,000"
              current="₹30,000"
              roi="+10.8%"
              gain="+₹5,000"
            />
          )}

          <Link
            to="/marketplace"
            className="primary-action investment-action"
          >
            Explore more properties →
          </Link>
        </div>
      )}
    </>
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
  return (
    <Page title="Wallet" eyebrow="YOUR BALANCE">
      <div className="wallet-card">
        <p>Available balance</p>

        <strong>₹24,500.00</strong>

        <span>
          Use your wallet to reserve property tokens.
        </span>

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
          label="Total deposits"
          value="₹1,50,000"
        />

        <Row
          label="Invested amount"
          value="₹1,20,000"
        />

        <Row
          label="Available to invest"
          value="₹24,500"
        />
      </div>
    </Page>
  );
}

export function Transactions() {
  return (
    <Page
      title="Transactions"
      eyebrow="ACCOUNT ACTIVITY"
    >
      <p className="page-intro">
        Your investments, dividend payouts and wallet
        activity in one place.
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
        Download your proof of fractional ownership for
        each confirmed investment.
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
    <Page
      title="Profile"
      eyebrow="ACCOUNT SETTINGS"
    >
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
  const rows = [
    [
      "18 Aug 2026",
      "Investment",
      "Marina Bay Towers",
      "−₹40,000",
      "Completed",
    ],
    [
      "12 Aug 2026",
      "Dividend",
      "Chandrayan Heights",
      "+₹1,150",
      "Completed",
    ],
    [
      "03 Aug 2026",
      "Deposit",
      "Wallet top-up",
      "+₹25,000",
      "Completed",
    ],
    [
      "28 Jul 2026",
      "Investment",
      "Skyline Business Park",
      "−₹30,000",
      "Completed",
    ],
  ];

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
          {rows.map((row) => (
            <tr key={row.join()}>
              {row.map((cell, index) => (
                <td
                  key={cell}
                  className={
                    index === 3 &&
                    cell.startsWith("+")
                      ? "positive"
                      : ""
                  }
                >
                  {index === 4 ? (
                    <span className="status">
                      {cell}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}