# Superpowers Brainstorm

## Goal
Identificar y proponer las mejores expansiones, mecánicas y mejoras de UX para la aplicación del Proyecto Polímata, alineadas con la visión gamificada de aprendizaje sistémico.

## Constraints
1. **Stack**: React 19, TypeScript Strict, **Tailwind CSS v4** (Sin librerías de componentes tipo MUI/shadcn).
2. **Estética**: Dark theme obligatorio (#0a0e17), estética rica/premium, micro-animaciones (Motion).
3. **Persistencia**: Todo el progreso debe vivir en **Zustand** persistente.
4. **Enfoque móvil**: Mobile-first por diseño.
5. **No estropear fases previas**: Mantener compatibilidad con Módulos y ConceptCards.

## Known context
- **Fase 1 completada**: HUD, Skill Tree, Concept Cards con SRS Spaced Repetition, Practice Labs (Laboratorios de contenido), Diarios, Quests, Mirror Matches y Penalizaciones (Debuffs por sesgos).
- El usuario reporta problemas de estética (como los scrollbars, ya resueltos) y le interesa mucho el diseño premium y dinámico del aplicativo.
- La aplicación tiene una gran carga de contenido pedagógico complejo que debe digerirse lúdicamente.

## Risks
- **Fatiga de Interfaz (Bloatware)**: Añadir demasiadas pestañas o HUDs puede abrumar al usuario móvil.
- **Rendimiento de Datos**: El objeto `progress` de Zustand puede crecer demasiado si no se gestionan bien los históricos.
- **Sobre-ingeniería sin contenido**: Crear mecánicas complejas (como Boss Fights) sin un flujo claro de contenido puede crear frustración.

## Options (2–4)

### 🧩 Opción 1: El "Toolbelt" (Arsenal Cognitivo)
*   **Qué es**: Un espacio donde el usuario colecciona "herramientas" activas (ej: "Navaja de Ockham", "Matriz Feedback Loop").
*   **Cómo funciona**: Al completar Practice Labs o dominar Cards, desbloqueas templates interactivos para usar en tu vida diaria (ej: una calculadora de retroalimentación sistémica).
*   **Impacto**: Transforma la app de un lector de cartas gamificado a un copiloto de pensamiento diario.

### ⚔️ Opción 2: Boss Fights (Mecánicas de Contradicción)
*   **Qué es**: Combates de fin de módulo contra una "creencia errónea" o "sesgo gigante".
*   **Cómo funciona**: Un módulo interactivo por turnos donde el usuario ataca usando Concept Cards (conceptos correctos) y defiende de "ideas trampa" identificando fallas de lógica.
*   **Impacto**: Satisface la Fase 2 del PRD y crea un clímax de aprendizaje épico.

### ✨ Opción 3: UX Dynamics & Jugabilidad (Gamificación Visual)
*   **Qué es**: Pulir la interfaz para que "se sienta" más como un videojuego vivo.
*   **Cómo funciona**: Añadir partículas de chispas a la XP al ganar, barras de carga animadas, feedbacks hápticos (si es posible) y un efecto de "fuego" visual (Streak Multiplier) cuando mantienes la racha.
*   **Impacto**: Eleva instantáneamente la estética a "Premium AAA".

### ⚔️ Opción 4: Contenido Dinámico con IA
*   **Qué es**: Usar el SDK de Gemini para crear Quests, Mirror Matches o análisis de sesgso personalizados a lo que el usuario está escribiendo de forma contextual en tiempo real.
*   **Impacto**: Relevancia extrema y jugabilidad infinita.

---

## Recommendation
Recomiendo implementar la **Opción 3 (UX Dynamics & Gamificación Visual)** combinada con el inicio de **Boss Fights (Opción 2)**. 
Un videojuego brilla por su "Juiciness" (lo jugoso que se siente pulsar un botón). Añadir animaciones de subida de nivel, chispas de XP y estética ardiente al streak enganchará al usuario exponencialmente antes de entrar en mecánicas de inventarios pesados.

## Acceptance criteria
1. **XP Burst Visual**: Al completar una Card o Quest, se debe emitir un efecto visual de partículas de XP flotando hacia el HUD.
2. **Level Up Pop-up**: Un modal con motion épico y sonido (opcional) cada vez que el `getCurrentLevel()` aumente.
3. **Efecto de Racha**: Si la racha es >3 días, el contador de streak debe tener un badge con un fuego animado con Framer Motion.
