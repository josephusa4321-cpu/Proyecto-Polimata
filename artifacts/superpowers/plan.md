# [Fase 2] Interactive Boss Fight (Combate por Turnos)

Transformar el actual `BossFightPanel` (que es solo un cuadro de texto) en un módulo de juego interactivo donde el usuario "debate" contra el boss usando sus conocimientos (Concept Cards).

## User Review Required

> [!IMPORTANT]
> Esto nos adentra en la **Fase 2** del proyecto. Requiere expandir el estado con `hp` (Puntos de Vida) o usar dinámicas de Framer Motion para simular turnos de juego.

## Proposed Changes

### 🎨 Componentes de Combate

#### [MODIFY] [BossFightPanel.tsx](file:///c:/Users/USUARIO/Desktop/Proyecto%20Polimata/src/components/BossFightPanel.tsx)
- Rediseñar el modal para mostrar:
  - **Barra de vida del usuario (HP)**: Basada en su racha o nivel.
  - **Barra de vida del Boss (HP)**: El "Sesgo" o monstruo conceptual.
  - **Mano de cartas**: Cartas del módulo actual cargadas para "atacar".
- Añadir lógica de turnos:
  1. El Boss lanza un **Argumento erróneo** (ej: "Los sistemas son estáticos").
  2. El usuario selecciona la **Concept Card correcta** para contrarrestarlo.
  3. Si la carta es correcta, la barra del Boss baja. Si no, baja la del usuario.

#### [NEW] [BossFightHUD.tsx](file:///c:/Users/USUARIO/Desktop/Proyecto%20Polimata/src/components/BossFightHUD.tsx)
- Un sub-componente para renderizar la vida y los avatares enfrentados.

---

## Verification Plan

### Manual Verification
1. Entrar a un módulo completo.
2. Iniciar el combate.
3. Verificar que bajen los puntos de vida al dar clic en las opciones de contra-argumento.
4. Mostrar pantalla de victoria/derrota animada.

---

## Approval
- [ ] Aprobado por el usuario para iniciar construcción.
