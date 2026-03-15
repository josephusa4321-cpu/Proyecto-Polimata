## Goal
Implementar un efecto de estallido de partículas (XP Burst) que lance chispas doradas/amarillas cuando se gana XP, dirigidas visualmente hacia el marcador de nivel del HUD para elevar la satisfacción del usuario.

## Assumptions
- Ya existe `src/components/XPGainIndicator.tsx` que escucha el estado `lastXPGain`.
- El HUD de nivel se encuentra en la esquina superior izquierda por defecto.
- Se puede usar `framer-motion` para animar coordenadas de pantalla relativas (`x`, `y`) desde el centro del indicador hacia el extremo del HUD.

## Plan

### 1. Enriquecer `XPGainIndicator.tsx` con Partículas
- **Archivo**: `src/components/XPGainIndicator.tsx`
- **Cambios**:
  - Alrededor del `<motion.div>` del texto `+XP`, mapear un array de 8-10 elementos ("chispas").
  - Cada chispa será un punto `<motion.div>` de color `bg-yellow-400` con `blur-sm` o brillo.
  - Diseñar la animación en dos fases:
    1. **Explosión Radial**: Se expanden hacia afuera en ángulos aleatorios.
    2. **Viaje al HUD**: Se desplazan hacia arriba y a la izquierda acelerando, mientras se encogen a escala 0.
- **Verificación**: Completar una quest o card en la app para detonar la ganancia de XP y certificar que se vean volar las chispas doradas hacia el HUD.

## Risks & mitigations
- **Riesgo**: Cálculo tosco de la trayectoria debido a que los marcadores pueden moverse en Responsive/Móvil.
  - **Mitigación**: Usar coordenadas relativas genéricas hacia el "Top-Left" de la pantalla o un simple "Burst" radial estético que se eleve, el cual suele ser responsive amigable y muy elegante.

## Rollback plan
Revertir el archivo `XPGainIndicator.tsx` a su versión original de cápsula flotante de texto.
