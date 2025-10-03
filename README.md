# 📅 planifica
Calendario y sistema de reservas en PHP Este proyecto implementa un calendario interactivo para la gestión de reservas de salas y horarios, con soporte para usuarios, departamentos y control básico de disponibilidad. Fue uno de mis primeros desarrollos en PHP, y ahora cuenta con un esquema SQL documentado para facilitar su despliegue.

# 📂 Estructura del repositorio
```bash
cal/
├── css/              # Estilos básicos del calendario
├── img/              # Iconos y recursos gráficos
├── js/               # Scripts de interacción
├── php/              # Lógica de servidor y consultas SQL
├── schemas.sql       # Esquema de base de datos para iniciar el proyecto
└── index.php         # Página principal del calendario
```

# 🧩 Funcionalidades principales
📆 Visualización de calendario en vista mensual.

🏢 Gestión de departamentos y salas.

👥 Usuarios con credenciales y asociación a departamentos.

📌 Reservas de salas con fecha, hora de inicio y fin, descripción y validación de solapamientos.

⏱️ Horarios de calendario para gestionar bloques de tiempo.

🔄 CRUD completo: creación, edición, eliminación y consulta de reservas.

🖱️ Interacción drag & drop: mover eventos de un día a otro o eliminarlos directamente arrastrándolos.

# ⚙️ Base de datos
El proyecto incluye un archivo schemas.sql que define todas las tablas necesarias:

```usuarios```

```departamento```

```salas```

```reserva```

```horariosCalendario```

```usuario_departamento```

# 🖱️ Usabilidad con Drag & Drop
El calendario incorpora interacción directa con los eventos:

🔄 Mover evento de día: arrastrando un evento a otra celda, se actualiza automáticamente su fecha en la base de datos.

❌ Eliminar evento: arrastrando un evento a la zona de borrado, se elimina de la base de datos.

⚡ Feedback inmediato: los cambios se reflejan en el calendario sin recargar toda la página.

# 🚀 Instalación y uso
Clonar el repositorio:

```bash
git clone https://github.com/Francisco-Sole/planifica.git
cd planifica/cal
```
Importar el esquema de base de datos:

```bash
mysql -u usuario -p basededatos < schemas.sql
```
Configurar la conexión a la base de datos en los scripts PHP.

Abrir index.php en el navegador.

# 👨‍💻 Autor
Francisco Solé 

📍 Barcelona, España 
