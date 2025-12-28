/**
 * Grid component that displays weeks as squares
 * Weeks flow left-to-right, top-to-bottom
 */

import { useMemo, useState } from "react";
import { Week } from "../domain/types";
import { WeekPopover } from "./WeekPopover";

interface WeekGridProps {
  weeks: Week[];
  weeksPerRow?: number;
}

export function WeekGrid({ weeks, weeksPerRow = 52 }: WeekGridProps) {
  const [hoveredWeek, setHoveredWeek] = useState<Week | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Group weeks by year for visual organization
  const weeksByYear = useMemo(() => {
    const grouped: Week[][] = [];
    let currentYear = weeks[0]?.startDate.getFullYear();
    let currentGroup: Week[] = [];

    weeks.forEach((week) => {
      const weekYear = week.startDate.getFullYear();
      if (weekYear !== currentYear) {
        if (currentGroup.length > 0) {
          grouped.push(currentGroup);
        }
        currentGroup = [week];
        currentYear = weekYear;
      } else {
        currentGroup.push(week);
      }
    });

    if (currentGroup.length > 0) {
      grouped.push(currentGroup);
    }

    return grouped;
  }, [weeks]);

  const handleWeekHover = (
    week: Week,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredWeek(week);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleWeekLeave = () => {
    setHoveredWeek(null);
    setPopoverPosition(null);
  };

  const getWeekColor = (week: Week): string => {
    if (week.entries.length === 0) {
      return "#e5e7eb"; // gray for empty weeks
    }

    // Use the color of the first entry, or a default
    return week.entries[0].color || "#6366f1";
  };

  return (
    <div style={{ position: "relative", padding: "2rem" }}>
      {weeksByYear.map((yearWeeks, yearIndex) => (
        <div key={yearIndex} style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              marginBottom: "0.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#666",
            }}
          >
            {yearWeeks[0].startDate.getFullYear()}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${weeksPerRow}, 1fr)`,
              gap: "2px",
              maxWidth: `${weeksPerRow * 12}px`, // 12px per week + gap
            }}
          >
            {yearWeeks.map((week) => (
              <div
                key={week.index}
                onMouseEnter={(e) => handleWeekHover(week, e)}
                onMouseLeave={handleWeekLeave}
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: getWeekColor(week),
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                title={`Week ${week.index + 1}`}
              />
            ))}
          </div>
        </div>
      ))}

      {hoveredWeek && popoverPosition && (
        <WeekPopover week={hoveredWeek} position={popoverPosition} />
      )}
    </div>
  );
}
