# Polymath Thinking System — Rules

## Stack
1. Framework: React 19 con Vite (latest) y TypeScript strict (5.x)
2. Estilos: Tailwind CSS v4
3. Iconos: Lucide React
4. Animaciones: Motion (Framer Motion)
5. Estado global: Zustand con middleware persist (localStorage)
6. Markdown: react-markdown + remark-gfm
7. IA (opcional): @google/genai (Gemini SDK)

## Arquitectura obligatoria
8. Seguir esta estructura de carpetas:
   src/
   ├── components/   (HUD, SkillTree, ConceptCard, StudyPanel, etc.)
   ├── stores/       (useGameStore.ts — Zustand)
   ├── data/         (JSONs de módulos, niveles, logros)
   ├── hooks/        (useCardStatus, useSpacedRepetition, useGemini)
   ├── types/        (index.ts — todas las interfaces)
   └── utils/        (xp.ts, storage.ts)

## Reglas de código
9. Todo el estado vive en Zustand, NUNCA en useState para datos de progreso
10. El contenido de las cards vive en archivos JSON en /data, NUNCA hardcodeado en componentes
11. TypeScript strict: no usar 'any', todas las interfaces definidas en types/index.ts
12. Mobile-first: diseñar para móvil primero, luego adaptar a desktop
13. Dark theme obligatorio: fondo #0a0e17, cards #1a1f2e
14. Idioma de la UI y contenido: español (Colombia)

## Reglas de desarrollo
15. Seguir las fases del PRD estrictamente: FASE 1 primero, no adelantarse
16. FASE 1 solo incluye: HUD, SkillTree, ConceptCard, StudyPanel, y módulo 1.1 (14 cards)
17. No construir Boss Fights, Toolbelt, ni Achievements hasta fases posteriores
18. Persistencia con localStorage via Zustand persist middleware
19. Si no hay API key de Gemini, mostrar placeholder, no crashear
20. Consultar .agent/rules/polymath-project.md para reglas detalladas

## No modificar
21. No modificar los archivos JSON de datos una vez creados (solo agregar nuevos)
22. No cambiar la tabla de niveles ni los valores de XP definidos en el PRD
23. No usar ninguna librería de UI (no MUI, no Chakra, no shadcn) — solo Tailwind
