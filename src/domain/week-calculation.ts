/**
 * Domain logic for week calculations.
 * All date math lives here, not in React components.
 */

import { User, Week, LifeEntry } from "./types";

/**
 * Calculates the start date of a given week index (0-based)
 * Week 0 starts on the date of birth
 */
export function getWeekStartDate(user: User, weekIndex: number): Date {
  const startDate = new Date(user.dateOfBirth);
  startDate.setDate(startDate.getDate() + weekIndex * 7);
  return startDate;
}

/**
 * Calculates the end date of a given week index (0-based)
 * Week end is 6 days after the start (7 days total)
 */
export function getWeekEndDate(user: User, weekIndex: number): Date {
  const startDate = getWeekStartDate(user, weekIndex);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  return endDate;
}

/**
 * Checks if a LifeEntry overlaps with a given week
 */
function doesEntryOverlapWeek(
  entry: LifeEntry,
  weekStart: Date,
  weekEnd: Date
): boolean {
  const entryStart = entry.startDate;
  const entryEnd = entry.endDate || new Date(); // If no endDate, treat as ongoing

  // Entry ends before week starts
  if (entryEnd < weekStart) return false;

  // Entry starts after week ends
  if (entryStart > weekEnd) return false;

  return true;
}

/**
 * Generates all weeks for a user's expected lifespan
 */
export function generateWeeks(user: User, entries: LifeEntry[]): Week[] {
  const totalWeeks = user.expectedLifespanYears * 52;
  const weeks: Week[] = [];

  for (let i = 0; i < totalWeeks; i++) {
    const startDate = getWeekStartDate(user, i);
    const endDate = getWeekEndDate(user, i);

    // Find all entries that overlap with this week
    const overlappingEntries = entries.filter((entry) =>
      doesEntryOverlapWeek(entry, startDate, endDate)
    );

    weeks.push({
      index: i,
      startDate,
      endDate,
      entries: overlappingEntries,
    });
  }

  return weeks;
}

/**
 * Calculates which week index a given date falls into
 */
export function getWeekIndexForDate(user: User, date: Date): number {
  const diffTime = date.getTime() - user.dateOfBirth.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekIndex = Math.floor(diffDays / 7);

  // Clamp to valid range
  const maxWeeks = user.expectedLifespanYears * 52;
  return Math.max(0, Math.min(weekIndex, maxWeeks - 1));
}

/**
 * Formats a date as a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
