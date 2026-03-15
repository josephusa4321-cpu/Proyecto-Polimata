# 🚀 Hoja de Ruta - Pendientes para Mañana

¡Descansa bro! Aquí te dejo el resumen ordenado de lo que nos queda por hacer para que mañana arranques de una.

---

## 🛠️ 1. Ajustes Inmediatos (Parches de Seguridad y UX)
*   **[x] Sincronizar Textos en la Nube**: Modificar `buildCloudGameState` para que suba tu `contentStore` (los textos que pegas en las cards). Así "Cargar Nube" nunca más borrará tus notas locales.
*   **[x] Panel de Respuestas (Bitácora)**: Agregar un botón de **Borrar** (para limpiar pruebas como *"dwad"*) y de **Editar** (para corregir typos).

---

## 🎯 2. Expansión de Misiones y Desafíos
*   **[x] Más Misiones Diarias**: Podemos ir a `src/data/quest-templates.ts` y redactar 10 plantillas nuevas de conexiones absurdas o aplicaciones de conceptos.
*   **[ ] Condición de Mirror Match y Shadow Quest**: Configurar para que salgan más seguido o tengan alertas visuales más agresivas cuando se activen.

---

## ⚔️ 3. Inicio Fase 2: Módulo de Combate (Boss Fights)
*   **[ ] Diseñar el Game Loop de Batalla**:
    *   *Barra de Vida del Jugador*: Baja si no recuerdas conceptos.
    *   *Barra del Boss*: Baja si "debates" sus ideas con tus Concept Cards en mano.
*   **[ ] Animaciones de Estudio**: Añadir efectos de Swipe (deslizar) o Flip (voltear carta) en el `StudyPanel` para que se sienta como un juego de cartas premium.
*   **[ ] Sistema de Logros (Achievements)**: Hacer que salte un Toast con confeti 🎉 en pantalla cuando completas un hito como *"Cross-Pollinator"*.

---

### 💡 Ideas locas que se me ocurren para sumar:
1.  **Efectos de Sonido UX**: Subtles bleeps retro-futuristas al ganar XP.
2.  **SkillTree Dinámico**: Que las ramas del árbol brillen o emitan partículas del color del Pilar (Verde, Azul, Dorado).
3.  **Modo Supervivencia**: Un "Relámpago" infinito donde las cartas salen cada vez más rápido hasta que fallas.

---
*Deja este archivo abierto. Mañana solo dime: **"Bro, empecemos por [XItem]"** y le damos fuego.* 🔥🤖
