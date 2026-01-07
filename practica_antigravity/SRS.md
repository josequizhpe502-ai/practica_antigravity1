# Especificación de Requerimientos de Software (SRS)
## Sistema del Centro de Apoyo y Co-creación para Emprendimientos UID

**Versión:** 1.0
**Fecha:** 2026-01-07
**Basado en:** Entrevista con el Ing. Alex Cárdenas

---

### 1. Introducción

#### 1.1 Propósito
El sistema tiene como objetivo centralizar, organizar y visibilizar los emprendimientos de la comunidad de la Universidad Internacional del Ecuador (UID). Busca servir como un ecosistema digital que conecte a emprendedores (estudiantes) con clientes, mentores y recursos, transformándose en un medio de uso recurrente y no solo transaccional.

#### 1.2 Alcance
El sistema web permitirá:
*   Gestión de perfiles de emprendedores y sus negocios.
*   Catálogo público de productos y servicios (tipo Marketplace).
*   Gestión de mentorías y asesorías especializadas.
*   Difusión de eventos, promociones y contenido de valor.
*   Interacción social mediante reseñas y valoraciones.

---

### 2. Actores del Sistema

| Actor | Descripción |
| :--- | :--- |
| **Emprendedor (Estudiante)** | Usuario principal que registra su negocio, publica productos, solicita mentorías y gestiona sus ventas. |
| **Visitante / Cliente** | Usuario (estudiante, docente, externo) que explora el catálogo, busca productos y contacta a vendedores. |
| **Tutor / Mentor** | Experto que ofrece asesorías, revisa progreso y brinda retroalimentación a los emprendedores. |
| **Admin (Marketing/Centro)** | Gestiona el contenido institucional, aprueba emprendimientos (moderación), publica eventos y noticias. |

---

### 3. Requerimientos Funcionales

#### 3.1 Módulo de Emprendimientos y Productos
*   **RF-001 Registro de Emprendimiento:** El sistema debe permitir a los estudiantes registrar sus emprendimientos con nombre, descripción, logo y redes sociales.
*   **RF-002 Clasificación por Categorías:** Los emprendimientos deben clasificarse por rubros (Ej: Alimentos, Moda, Tecnología) y no por antigüedad.
*   **RF-003 Catálogo de Productos:** Cada emprendimiento debe poder registrar múltiples productos/servicios con foto, precio y detalles.
*   **RF-004 Estado del Negocio:** El sistema debe permitir actualizar el estado del emprendimiento (Activo, Inactivo) basado en actividad reciente.

#### 3.2 Módulo Marketplace y Visibilidad
*   **RF-005 Buscador y Filtros:** Búsqueda avanzada por nombre, categoría y orden alfabético.
*   **RF-006 Detalle de Producto:** Vista detallada con botón de contacto/compra (redirige a WhatsApp o correo del emprendedor).
*   **RF-007 Reseñas y Calificaciones:** Los usuarios autenticados deben poder calificar (estrellas) y dejar comentarios en productos/emprendimientos.
*   **RF-008 Ranking de Populares:** Mostrar sección de "Más Vendidos" o "Populares" basado en interacciones o ventas reportadas (simulado inicialmente por vistas/clics).

#### 3.3 Módulo de Asesoría y Mentoría
*   **RF-009 Solicitud de Mentorías:** Los emprendedores deben poder solicitar tutorías sobre temas específicos (Legal, Marketing, Finanzas).
*   **RF-010 Asignación de Tutores:** El sistema debe permitir asignar un tutor a una solicitud de mentoría.
*   **RF-011 Registro de Avance:** Tutores y emprendedores deben poder registrar notas o hitos de las sesiones de mentoría.
*   **RF-017 Asistente Virtual:** Integración opcional con IA (tipo ChatGPT) para brindar orientación básica 24/7 a emprendedores sobre dudas frecuentes.

#### 3.4 Módulo de Contenido y Comunidad
*   **RF-012 Noticias y Blog:** Sección gestionada por Admin para publicar artículos, tips de emprendimiento y casos de éxito.
*   **RF-013 Eventos y Promociones:** Calendario de eventos (ferias, webinars) y sección de promociones temporales (Ej: CyberDays).
*   **RF-014 Testimonios:** Espacio para publicar historias de éxito o experiencias de otros emprendedores (Red de Voluntarios).

#### 3.5 Módulo de Administración y Moderación
*   **RF-015 Moderación de Contenido:** El Admin debe aprobar nuevos emprendimientos o productos antes de ser públicos para evitar contenido inapropiado.
*   **RF-016 Panel de Métricas:** Visualización básica de emprendimientos registrados, categorías más populares y actividad reciente.

---

### 4. Requerimientos No Funcionales

#### 4.1 Usabilidad y Diseño
*   **RNF-001 Diseño Atractivo:** La interfaz debe ser moderna, visualmente impactante y profesional (evitar apariencia de "tarea escolar").
*   **RNF-002 Experiencia de Usuario (UX):** La navegación debe ser intuitiva, priorizando el descubrimiento de productos en menos de 3 clics.
*   **RNF-003 Responsividad:** El sistema debe ser totalmente funcional en dispositivos móviles (Web Responsive), dado que los estudiantes usan principalmente celulares.

#### 4.2 Rendimiento y Escalabilidad
*   **RNF-004 Carga Rápida:** Las páginas del catálogo deben cargar en menos de 3 segundos, optimizando imágenes automáticamente.
*   **RNF-005 Escalabilidad:** La base de datos debe soportar crecimiento en número de productos y reseñas sin degradar el rendimiento.

#### 4.3 Seguridad
*   **RNF-006 Autenticación:** Uso de credenciales seguras (posible integración con correo institucional en el futuro).
*   **RNF-007 Protección de Datos:** No exponer datos sensibles (teléfono personal) a menos que el emprendedor lo autorice explícitamente para ventas.

---

### 5. Reglas de Negocio
*   **RN-001:** Un emprendimiento solo puede ser creado por un usuario con rol de "Estudiante/Emprendedor".
*   **RN-002:** Las reseñas solo pueden ser emitidas por usuarios registrados para evitar spam.
*   **RN-003:** El orden de aparición en listas por defecto debe ser alfabético o aleatorio para no favorecer injustamente a antiguos sobre nuevos (equidad).

