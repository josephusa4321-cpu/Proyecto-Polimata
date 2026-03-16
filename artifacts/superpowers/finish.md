## Verification
- **Paso 1 (Estado)**: Añadido `key` prop a `ExerciseSection` en `PracticeLabPanel.tsx` (Línea 152).
  - *Resultado*: React fuerza el remontado y resetea el estado al cambiar de ejercicio.
- **Paso 2 (Ancho)**: Modificado `md:w-[900px]` a `md:w-1/2` en `StudyPanel.tsx` (Línea 94).
  - *Resultado*: Panel ocupa 50% de la pantalla en desktop.
- **Paso 3 (Estilo)**: Removido wrapper `prose` de `PracticeLabPanel` en `StudyPanel.tsx` (Línea 133).
  - *Resultado*: Letra y márgenes vuelven al tamaño estándar de la aplicación.

## Summary of Changes
- `src/components/PracticeLab/PracticeLabPanel.tsx` -> Añadido `key={\`ex-\${level}\`}`.
- `src/components/StudyPanel.tsx` -> Cambiado `md:w-1/2` y condicionado wrapper `prose`.

## Follow-ups
- Ninguno. Listo para prueba visual del usuario.