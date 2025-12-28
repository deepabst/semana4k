## Code Rules

- Prefer pure functions
- Keep date math out of React components
- Domain logic lives in /src/domain
- UI components must not calculate weeks or dates
- Avoid premature abstraction
- Prefer clarity over cleverness
- Do not introduce a backend

---

## Style Rules

- Use TypeScript strictly
- No `any`
- Prefer named exports
- Avoid deeply nested components
- Use descriptive variable names

---

## Performance Rules

- Weeks should be derived once and memoized
- 4,000+ DOM nodes is acceptable
- Avoid unnecessary re-renders
