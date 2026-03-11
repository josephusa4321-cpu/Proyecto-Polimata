# Superpowers Review - Phase 4 DB Integration & Logic Fixes

## Blockers
- None.

## Majors
- **Impure Function in Render (`src/components/CapstoneNode.tsx`)**: `Math.random()` is being called directly during render to position the sparkling dots (lines 63-64). This violates React's rules for pure components and causes hydration mismatches or unstable DOM updates on re-renders. *(Should move `Math.random` to a `useMemo` or `useEffect`)*.
- **Missing Row Level Security (RLS)**: The `user_progress` table in Supabase was created without RLS policies. Anyone with the anon key can query or overwrite any `device_id`. Since it's a personal app this isn't an immediate blocker for local-only use, but it's a major security gap for production deployment.

## Minors
- **Timeout Memory Leaks (`src/stores/useGameStore.ts`)**: In `syncToCloud` and `loadFromCloud`, `setTimeout` is used to clear the sync status after 3000ms. If the user triggers multiple syncs rapidly, these timeouts can overlap and clear the status prematurely, causing UI flickering.
- **Error Handling Granularity (`src/stores/useGameStore.ts`)**: `syncToCloud` catches errors but only logs to console and sets a generic `error` state. It doesn't surface the actual error message to the user UI.

## Nits
- **Typo/Consistency**: `PGRST116` hardcoded string is correct for Supabase "no rows" error, and documented with a tiny comment `// ignore no rows error`. Better to extract this into a named constant at the file level for clarity, e.g., `SUPABASE_ERROR_NOT_FOUND`.

## Overall Summary & Next Actions
The integration of Supabase and the dynamic refactoring of the Milestone/Capstone engine are solid. The dynamic card counting accurately maps to `ALL_CARDS.length`, bypassing the old hardcoded limitations. The integration point into the Zustand store runs asynchronously as designed. The codebase is successfully migrated to support dynamic content fetching.

**Next Actions:**
1. Fix the `Math.random()` lint warning in `CapstoneNode.tsx` immediately.
2. (Optional but recommended) Add an RLS policy to the Supabase table ensuring users can restrict access if they plan to host the app.
3. Fix the overlapping timeout issue in `syncToCloud` and `loadFromCloud`.
