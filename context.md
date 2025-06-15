Web App de Memorama Familiar
Contexto: Crea una aplicación web con Vite + React y CSS modular que permita a mi papá descubrir una foto de familia oculta tras completar un memorama bajo un tiempo límite. El proyecto debe ser minimalista, responsive y con efectos profesionales.

📌 Requerimientos técnicos:
Stack:

Vite + React 

archivos de CSS para estilos 

Librerías clave: canvas-confetti (para confeti), react-youtube (para canción).

Estructura de componentes:

src/  
├─ assets/ (fotos, sonidos)  
├─ components/  
│  ├─ MemoryGame/ (lógica del memorama)  
│  ├─ LockedPhoto/ (foto bloqueada)  
│  ├─ Confetti/ (animación)  
│  ├─ Timer/ (cuenta regresiva)  
├─ App.jsx (orquestación principal)  

🎮 Funcionalidades clave:

1. Foto Bloqueada:
Visual:

Foto de familia cubierta por una capa semitransparente (ej: rgba(0,0,0,0.7)).

Icono de candado centrado (usar SVG o emoji 🔒).

Revelado: Solo se muestra al completar el memorama (transición suave con opacity y fade-in).

2. Memorama:
Cartas:

Imágenes de cosas que le gustan a tu papá (ej: herramientas, deportes, comidas).

Grid de 6x6 (18 pares) – ajustable.

Mecánica:

Voltear cartas con clic, verificar pares, deshabilitar aciertos.

Contador de intentos y pares encontrados.

Tiempo límite: 60 segundos (mostrar cuenta regresiva con formato 00:60 → 00:00).

3. Efectos de Éxito:
Confeti:

Usar canvas-confetti (explosión radial con colores: dorado, azul, rojo).

Disparar al 100% de completitud del memorama.

Canción:

Integrar YouTube (ej: enlace a "Celebration" de Kool & The Gang) con react-youtube.

Reproducción automática al ganar (opción autoplay: 1).

Mensaje:

Texto con fade-in (CSS animation: opacity: 0 → 1 en 2s).

Ejemplo: "¡Feliz Día, Papá! ❤️" (personalizable luego).

4. Estilo:
Fuente: Montserrat (importar de Google Fonts).

Paleta:

Fondo: #f8f9fa (gris claro).

Cartas: #ffffff con sombra suave (box-shadow: 0 4px 8px rgba(0,0,0,0.1)).

Tiempo: rojo progresivo (#ff6b6b cuando queden ≤10 segundos).

Responsive:

Grid de cartas adaptable (grid-template-columns: repeat(auto-fit, minmax(80px, 1fr))).

📝 Código Base Solicitado:
La IA debe generar:

Componente MemoryGame:

Lógica de manejo de estados (cartas volteadas, pares, game over).

Efectos de sonido al voltear/acertar (opcional).

Animaciones:

Confeti con canvas-confetti (configuración: { spread: 90, particleCount: 150 }).

Transición de foto bloqueada → visible.

Integración multimedia:

Foto de familia en assets/family.jpg.

Iframe de YouTube (oculto hasta el éxito).

🔗 Extras:
Deploy: Instrucciones para publicar en Vercel (ej: vite.config.js con base URL).

Testing: Sugerir cómo probar la responsividad (DevTools + iPhone SE).

