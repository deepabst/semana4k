/**
 * Core data models for the Semana4K application
 */

export interface User {
  dateOfBirth: Date;
  expectedLifespanYears: number;
}

export interface LifeEntry {
  id: string;
  type: "work" | "education" | "event" | "relationship" | "custom";
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  color?: string;
}

export interface Week {
  index: number;
  startDate: Date;
  endDate: Date;
  entries: LifeEntry[];
}

/**
 * Invariants:
 * - endDate >= startDate
 * - Weeks are contiguous
 * - A LifeEntry may span multiple weeks
 * - Multiple LifeEntries may overlap a single week
 */
