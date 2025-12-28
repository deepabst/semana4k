/**
 * Main App component that orchestrates the form and grid visualization
 */

import { useState, useMemo } from "react";
import { User, LifeEntry } from "./domain/types";
import { generateWeeks } from "./domain/week-calculation";
import { LifeDataForm } from "./components/LifeDataForm";
import { WeekGrid } from "./components/WeekGrid";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<LifeEntry[]>([]);

  const weeks = useMemo(() => {
    if (!user) return [];
    return generateWeeks(user, entries);
  }, [user, entries]);

  const handleFormSubmit = (newUser: User, newEntries: LifeEntry[]) => {
    setUser(newUser);
    setEntries(newEntries);
  };

  if (!user) {
    return <LifeDataForm onSubmit={handleFormSubmit} />;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <header
        style={{
          padding: "1rem 2rem",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            Your Life in 4,000 Weeks
          </h1>
          <button
            onClick={() => {
              setUser(null);
              setEntries([]);
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Start Over
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <WeekGrid weeks={weeks} />
      </div>
    </div>
  );
}
