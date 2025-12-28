# Architecture and Context

## Tech Stack

- React + TypeScript
- Vite for build tooling
- No heavy charting libraries
- Local-first, single-user app
- No backend or API

## Project Structure

```
src/
  domain/           # All business logic and date calculations
    types.ts        # Core data models (User, LifeEntry, Week)
    week-calculation.ts  # Week generation and date math
    life-entry-creation.ts  # Factory functions for creating entries
  components/       # React UI components
    LifeDataForm.tsx    # Initial data collection form
    WeekGrid.tsx        # Grid visualization component
    WeekPopover.tsx     # Hover tooltip component
  App.tsx           # Main application orchestrator
  main.tsx          # Entry point
```

## Core Data Models

### User

```typescript
User {
  dateOfBirth: Date
  expectedLifespanYears: number
}
```

### LifeEntry

```typescript
LifeEntry {
  id: string
  type: 'work' | 'education' | 'event' | 'relationship' | 'custom'
  title: string
  description?: string
  startDate: Date
  endDate?: Date
  color?: string
}
```

### Week

```typescript
Week {
  index: number
  startDate: Date
  endDate: Date
  entries: LifeEntry[]
}
```

## Design Principles

- Date math must live outside React components (in domain layer)
- Weeks are generated once and memoized
- Grid displays 52 weeks per row (one year)
- Weeks flow left-to-right, top-to-bottom
- Weeks are visually grouped by year
- The visualization should feel contemplative, not busy
