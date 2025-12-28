# Semana4K

An interactive visualization of your life as 4,000 weeks (approximately 80 years). Each week is represented as a small square in a grid, and hovering over a week reveals what was happening in your life during that time.

## Features

- **Life Grid**: Visualize your entire expected lifespan as a grid of weekly squares
- **Interactive Hover**: See details about each week including education, work, relationships, and events
- **Data Collection**: Easy-to-use form to input your birthdate, education history, and career timeline
- **Visual Organization**: Weeks are grouped by year for easy navigation

## Tech Stack

- React 18
- TypeScript
- Vite
- Pure CSS (no heavy charting libraries)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  domain/           # Business logic and date calculations
    types.ts        # Core data models
    week-calculation.ts  # Week generation logic
    life-entry-creation.ts  # Factory functions
  components/       # React components
    LifeDataForm.tsx    # Data input form
    WeekGrid.tsx        # Grid visualization
    WeekPopover.tsx     # Hover tooltip
  App.tsx           # Main application
```

## Usage

1. Enter your date of birth
2. Set your expected lifespan (default: 80 years)
3. Add your education history (schools, dates)
4. Add your career history (jobs, dates)
5. Click "Generate Life Visualization" to see your life as a grid of weeks
6. Hover over any week to see details about that time in your life

## License

MIT
