# Finish Report - XP Burst Particles

## Summary of Changes
- **XPGainIndicator.tsx**: Enriquecido el indicador de ganancia de XP (`+XP`) con un sistema de partículas dinámico.
  - Al crearse la cápsula de texto flotante, se disparan 12 chispas doradas (`bg-yellow-300` / `amber-500`) en abanico circular.
  - Cada chispa utiliza keyframes de `framer-motion` para simular una explosión radial y un viaje acelerado hacia la esquina superior izquierda (donde se ubica el HUD de nivel), disolviéndose suavemente a escala 0.

## Verification
- **Visual**: Al simular la ganancia de XP, 12 chispas amarillas explotan cubriendo un radio de 50px y luego vuelan hacia el HUD escalando y encogiéndose fluidamente.
- **Rendimiento**: La cantidad de chispas está acorralada y se desmonta junto al indicador principal tras 2 segundos.

## Manual Validation (Para el Usuario)
1. Gana XP por cualquier vía (completar card, quest o lab).
2. Verás volar un estallido de luces doradas hacia tu número de nivel antes de que se sume la experiencia físicamente.