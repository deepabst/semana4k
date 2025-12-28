/**
 * Popover component that displays week details on hover
 */

import { Week } from "../domain/types";
import { formatDate } from "../domain/week-calculation";

interface WeekPopoverProps {
  week: Week;
  position: { x: number; y: number };
}

export function WeekPopover({ week, position }: WeekPopoverProps) {
  const ageInYears = Math.floor(week.index / 52);
  const ageInWeeks = week.index % 52;

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -100%)",
        marginTop: "-8px",
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        minWidth: "250px",
        maxWidth: "300px",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <div style={{ marginBottom: "0.5rem" }}>
        <div
          style={{
            fontSize: "0.875rem",
            color: "#666",
            marginBottom: "0.25rem",
          }}
        >
          Week {week.index + 1} of{" "}
          {week.index < 52 ? "Year 1" : `${ageInYears + 1}`}
        </div>
        <div style={{ fontSize: "0.875rem", color: "#666" }}>
          {formatDate(week.startDate)} - {formatDate(week.endDate)}
        </div>
        {ageInYears > 0 && (
          <div style={{ fontSize: "0.875rem", color: "#666" }}>
            Age: {ageInYears} years, {ageInWeeks} weeks
          </div>
        )}
      </div>

      {week.entries.length > 0 ? (
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#666",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            Life Events
          </div>
          {week.entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                marginBottom: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "#f9fafb",
                borderRadius: "4px",
                borderLeft: `3px solid ${entry.color || "#6366f1"}`,
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                {entry.title}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#666",
                  textTransform: "capitalize",
                }}
              >
                {entry.type}
              </div>
              {entry.description && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#666",
                    marginTop: "0.25rem",
                  }}
                >
                  {entry.description}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{ fontSize: "0.875rem", color: "#999", fontStyle: "italic" }}
        >
          No events recorded for this week
        </div>
      )}
    </div>
  );
}
