# Project: Semana4K (4,000 Weeks)

## Purpose

Build a personal life visualisation app that represents a human lifespan as ~4,000 weekly boxes in a grid.
Each box represents one week of life starting from the user's date of birth.

Users can add life periods (education, work, events).
Hovering a week shows what was happening during that time.

This is a local-first, single-user app.
No authentication.
No backend.

---

## Core Concepts

- Week = 7-day period starting from date of birth
- Lifespan default: 80 years (editable)
- Total weeks ≈ 4,000
- Weeks flow left-to-right, top-to-bottom
- Weeks are visually grouped by year

---

## Non-Goals

- No social features
- No sharing
- No analytics
- No gamification
- No backend or API
- No mobile app (desktop web first)

---

## UX Principles

- The grid must render instantly
- Hover interactions must feel light and immediate
- Information density > decoration
- The visualization should feel contemplative, not busy

---

## Tech Constraints

- React + TypeScript
- Vite
- No heavy charting libraries
- Date math must live outside React components
