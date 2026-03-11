## Goal
Solucionar las inconsistencias de lógica (Milestones y Capstone limitados a Fase 1) e integrar una base de datos real (Supabase) para tener la aplicación lista para un entorno de uso personal en producción, asegurando persistencia en la nube.

## Assumptions
- Usaremos **Supabase** como backend/DB porque ofrece un "tier" gratuito excelente, base de datos PostgreSQL, y es ideal para proyectos personales que buscan robustez escalable.
- El usuario creará un proyecto de Supabase y proporcionará las credenciales en un archivo `.env.local` antes de ejecutar la implementación.
- La aplicación actual guarda el progreso en `localStorage` mediante Zustand persist. Implementaremos una capa secundaria que sincronice con Supabase para no perder la fluidez offline/local.

## Plan

### Paso 1: Configurar Cliente Supabase y Variables de Entorno
- **Files**: `.env.local`, `src/lib/supabase.ts` (NUEVO), `src/stores/useGameStore.ts`
- **Change**: Instalar `@supabase/supabase-js`. Crear la instancia del cliente en `lib/supabase.ts`. 
- **Verify**: `npm run dev` compila sin errores. El cliente Supabase se inicializa correctamente al arrancar la app.

### Paso 2: Parametrizar Valores "Hardcoded" (Los 194 Cards)
- **Files**: `src/stores/useGameStore.ts`, `src/components/StatsDashboard.tsx`, `src/components/HUD.tsx`
- **Change**: Eliminar todas las referencias a `14` como el total de cartas. Reemplazar por `ALL_CARDS.length`. Actualizar el HUD para mostrar el nivel de compleción contra 194.
- **Verify**: Ver en el HUD "Cards: X / 194". Ver en Stats Dashboard la metadata actualizada indicando 194 cartas totales y 22 Boss Fights.

### Paso 3: Motor de Milestones de Pilar y Logros
- **Files**: `src/stores/useGameStore.ts`, `src/components/MilestoneList.tsx`
- **Change**: Añadir al estado `completedMilestones: string[]`. Cuando todas las cards y bosses de un Pilar cambien a completadas, el store detecta el hito, añade su ID al array, dispara +300 XP (o lo que dicte el milestone) y el logro `pillar-master-X`. Refactorizar `MilestoneList.tsx` para leer este estado.
- **Verify**: Completar un Boss final de pilar manualmente. Ver subir los XP en el HUD y el logro de Pillar Master.

### Paso 4: Capstone Vinculado a Milestones Reales
- **Files**: `src/components/CapstoneNode.tsx`
- **Change**: Actualizar los requirements del Capstone. En lugar de pedir cards del módulo 1.1, debe pedir que el array `completedMilestones` tenga longitud igual a 5.
- **Verify**: Abrir la UI. El Capstone debe mostrar 5 checkmarks (uno por cada pilar) y solo estar disponible si todos están cumplidos.

### Paso 5: Sincronización DB (Cloud Save en Supabase)
- **Files**: `src/stores/useGameStore.ts`, `src/components/SettingsPanel.tsx`
- **Change**: Crear la acción `syncToCloud` y `loadFromCloud` en el store que toma todo el estado "crítico" (xp, arrays de ids) y hace un `upsert` a una tabla de Supabase (`user_progress`). Añadir botones manuales "Guardar en la Nube" y "Cargar de la Nube" en Settings.
- **Verify**: Jugar, ganar XP, pulsar "Guardar en la Nube". Recargar la página en modo incógnito (sin localstorage), pulsar "Cargar de la Nube", verificar que se restauran la XP y las cards.

## Risks & mitigations
- **Riesgo**: Sobrescribir progreso local por accidente con datos vacíos de la nube.
- **Mitigación**: Siempre preguntar confirmación antes de "Cargar de la nube" e indicar el timestamp de la última partida guardada vs la local.
- **Riesgo**: Exceso de escrituras en la base de datos (Rate Limits de Supabase).
- **Mitigación**: Empezaremos con Guardado Manual (Botón).

## Rollback plan
- Si la integración falla, revertiremos el estado de Git previo a la inyección de Supabase y eliminaremos la dependencia.
- La lógica de Hitos (Paso 2 al 4) correrá exclusivamente local y no requiere de la base de datos para funcionar.
