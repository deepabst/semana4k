/**
 * Utilities for creating LifeEntry objects from user input
 */

import { LifeEntry } from "./types";

/**
 * Creates a work entry
 */
export function createWorkEntry(
  title: string,
  startDate: Date,
  endDate: Date | undefined,
  description?: string
): LifeEntry {
  return {
    id: generateId(),
    type: "work",
    title,
    description,
    startDate,
    endDate,
    color: "#3b82f6", // blue
  };
}

/**
 * Creates an education entry
 */
export function createEducationEntry(
  title: string,
  startDate: Date,
  endDate: Date | undefined,
  description?: string
): LifeEntry {
  return {
    id: generateId(),
    type: "education",
    title,
    description,
    startDate,
    endDate,
    color: "#10b981", // green
  };
}

/**
 * Creates a relationship entry
 */
export function createRelationshipEntry(
  title: string,
  startDate: Date,
  endDate: Date | undefined,
  description?: string
): LifeEntry {
  return {
    id: generateId(),
    type: "relationship",
    title,
    description,
    startDate,
    endDate,
    color: "#ec4899", // pink
  };
}

/**
 * Creates an event entry
 */
export function createEventEntry(
  title: string,
  date: Date,
  description?: string
): LifeEntry {
  return {
    id: generateId(),
    type: "event",
    title,
    description,
    startDate: date,
    endDate: date, // Events are single-day
    color: "#f59e0b", // amber
  };
}

/**
 * Generates a unique ID for entries
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
