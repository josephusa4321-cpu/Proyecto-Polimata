## Goal
Corregir la gestión de estados (sobreescritura de respuestas) y ajustar las dimensiones/estilos de la interfaz para que sea más legible y ocupe el 50% de la pantalla.

## Assumptions
- `PracticeLabPanel` es contenido interactivo y no debe estar bajo el formateo `prose`.
- El ajuste `md:w-1/2` se adapta al requerimiento de "mitad de la pantalla" de forma responsiva.

## Plan

### Paso 1: Fijar Estado por Ejercicio
- **Files**: `src/components/PracticeLab/PracticeLabPanel.tsx`
- **Change**: Añadir prop `key={\`ex-\${level}\`}` a `<ExerciseSection>` (línea ~152).
- **Verify**: Cambiar de ejercicio y verificar que el campo de texto se limpie/sea independiente.

### Paso 2: Redimensionar Ancho del Panel
- **Files**: `src/components/StudyPanel.tsx`
- **Change**: Modificar `md:w-[900px]` por `md:w-1/2` cuando `showPracticeLab` sea true (línea ~94).
- **Verify**: El panel debe ocupar la mitad de la pantalla en dispositivos medianos/grandes.

### Paso 3: Corregir Inflación de Estilos (Remover `prose`)
- **Files**: `src/components/StudyPanel.tsx`
- **Change**: Ajustar el renderizado condicional (línea ~133) para que `PracticeLabPanel` no esté dentro del contenedor con la clase `prose`.
- **Verify**: Los textos deben tener el tamaño estándar de la aplicación.

## Risks & mitigations
- **Riesgo**: `md:w-1/2` podría verse algo estrecho en pantallas de laptops pequeñas.
- **Mitigación**: El diseño es responsivo y el contenido se ajusta verticalmente.

## Rollback plan
- Ejecutar `git restore src/components/PracticeLab/PracticeLabPanel.tsx src/components/StudyPanel.tsx` para revertir cambios.
