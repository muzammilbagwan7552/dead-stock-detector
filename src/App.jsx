import { useMemo, useState } from "react";
import "./App.css";

const inventory = [
  {
    id: 1,
    name: "Arduino Uno",
    category: "Microcontroller",
    quantity: 4,
    location: "AIML Lab",
    condition: "Good",
    price: 400,
  },
  {
    id: 2,
    name: "Ultrasonic Sensor",
    category: "Sensor",
    quantity: 12,
    location: "Electronics Lab",
    condition: "Good",
    price: 120,
  },
  {
    id: 3,
    name: "Digital Multimeter",
    category: "Testing Tool",
    quantity: 3,
    location: "Electrical Lab",
    condition: "Excellent",
    price: 650,
  },
  {
    id: 4,
    name: "Jumper Wire Kit",
    category: "Component",
    quantity: 18,
    location: "AIML Lab",
    condition: "Good",
    price: 150,
  },
  {
    id: 5,
    name: "ESP32 Board",
    category: "Microcontroller",
    quantity: 6,
    location: "IoT Lab",
    condition: "Excellent",
    price: 550,
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const results = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return inventory;

    return inventory.filter((item) =>
      `${item.name} ${item.category} ${item.location}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const totalItems = inventory.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const estimatedValue = inventory.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const searchedItem = results.length === 1 ? results[0] : null;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">DS</div>

          <div>
            <h1>Dead Stock Detector</h1>
            <p>Campus Resource Discovery</p>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Inventory Online
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">SMART CAMPUS INVENTORY</span>

            <h2>
              Don't buy first.
              <br />
              <span>Check first.</span>
            </h2>

            <p>
              Find equipment and resources already available on campus
              before spending money on new ones.
            </p>

            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search for Arduino, sensor, multimeter..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-label">CAMPUS INVENTORY</div>

            <div className="hero-number">{totalItems}</div>

            <div className="hero-small">resources available</div>

            <div className="hero-line"></div>

            <div className="hero-saving">
              <span>Estimated inventory value</span>

              <strong>
                ₹{estimatedValue.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>
        </section>

        {searchedItem && (
          <section className="buy-alert">
            <div className="buy-alert-glow"></div>

            <div className="buy-alert-icon">✓</div>

            <div className="buy-alert-content">
              <span className="eyebrow">BEFORE YOU BUY</span>

              <h3>
                {searchedItem.name} is already available.
              </h3>

              <p>
                We found <strong>{searchedItem.quantity} units</strong> in the{" "}
                <strong>{searchedItem.location}</strong>.
              </p>
            </div>

            <div className="buy-alert-saving">
              <span>POTENTIAL PURCHASE AVOIDED</span>

              <strong>
                ₹
                {(
                  searchedItem.quantity * searchedItem.price
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              className="details-button"
              onClick={() => setSelectedItem(searchedItem)}
            >
              View details →
            </button>
          </section>
        )}

        <section className="stats">
          <div className="stat-card">
            <span>AVAILABLE ITEMS</span>
            <strong>{inventory.length}</strong>
          </div>

          <div className="stat-card">
            <span>TOTAL UNITS</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="stat-card ">
            <span>SEARCH RESULT</span>
            <strong>{results.length}</strong>
          </div>

          <div className="stat-card">
            <span>LAB LOCATIONS</span>
            <strong>4</strong>
          </div>
        </section>

        <section className="inventory-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LIVE INVENTORY</span>
              <h3>Available Resources</h3>
            </div>

            <button className="admin-button">
              Admin Panel →
            </button>
          </div>

          {results.length === 0 ? (
            <div className="empty">
              <div>🔎</div>

              <h3>No resource found</h3>

              <p>
                Try another keyword. The item may not be in the inventory yet.
              </p>
            </div>
          ) : (
            <div className="inventory-grid">
              {results.map((item) => (
                <article
                  className="item-card"
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="item-top">
                    <div className="item-icon">▦</div>

                    <span className="available">AVAILABLE</span>
                  </div>

                  <h4>{item.name}</h4>

                  <p className="category">{item.category}</p>

                  <div className="item-details">
                    <div>
                      <span>QUANTITY</span>
                      <strong>{item.quantity} units</strong>
                    </div>

                    <div>
                      <span>LOCATION</span>
                      <strong>{item.location}</strong>
                    </div>

                    <div>
                      <span>CONDITION</span>
                      <strong>{item.condition}</strong>
                    </div>
                  </div>

                  <div className="check-message">
                    ✓ Check this resource before buying
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <span>DEAD STOCK DETECTOR</span>

        <span>Find what exists. Use what exists.</span>
      </footer>

      {selectedItem && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="detail-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              ×
            </button>

            <span className="eyebrow">RESOURCE DETAILS</span>

            <div className="modal-icon">▦</div>

            <h3>{selectedItem.name}</h3>

            <p className="modal-category">
              {selectedItem.category}
            </p>

            <div className="modal-grid">
              <div>
                <span>AVAILABLE</span>
                <strong>{selectedItem.quantity} units</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>{selectedItem.location}</strong>
              </div>

              <div>
                <span>CONDITION</span>
                <strong>{selectedItem.condition}</strong>
              </div>

              <div>
                <span>UNIT VALUE</span>
                <strong>₹{selectedItem.price}</strong>
              </div>
            </div>

            <div className="modal-warning">
              <strong>💚 DON'T BUY IT YET.</strong>

              <span>
                This resource already exists on campus.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;