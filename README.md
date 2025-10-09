# 🚀 Proyecto de Gestión de Pedidos y Clientes

## Descripción General

Este proyecto es una **aplicación web completa** diseñada para la gestión integral de **pedidos, clientes, inventario y personal**. Su objetivo es proporcionar una plataforma robusta para la administración de un negocio que maneja productos con posible personalización y diferentes roles de personal (Administradores, Repartidores, Cocineros, etc.).

La arquitectura se basa en un **backend escalable** utilizando **NestJS** (Node.js) y una **base de datos relacional (PostgreSQL)**, con un **frontend interactivo** construido con **Vue.js** y estilizado con **Bootstrap**.

---

## 🛠 Stack Tecnológico

| Componente | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Backend (API)** | **NestJS** | Framework de Node.js que sigue la arquitectura de TypeScript, proporcionando una estructura modular y escalable. |
| **Base de Datos** | **PostgreSQL** | Base de datos relacional de código abierto, utilizada por su fiabilidad y soporte de tipos avanzados (ENUMs, Timestamps). |
| **ORM** | **TypeORM** | Utilizado en NestJS para mapear las entidades de la base de datos a clases de TypeScript. |
| **Frontend (UI)** | **Vue.js** | Framework progresivo para la construcción de interfaces de usuario interactivas. |
| **Estilos** | **Bootstrap** | Framework de CSS para un diseño responsive y modular, garantizando una buena apariencia desde el inicio. |

---

## 🗺 Modelo de Datos (Esquema de Base de Datos)

El sistema se estructura alrededor de las siguientes entidades, enfocándose en la **segregación de perfiles** (`Usuario` $\rightarrow$ `Cliente`/`Personal`) y la **gestión transaccional** (`Pedido` $\rightarrow$ `DetallePedido`).

### Entidades de Perfil y Acceso

* **Usuarios**: Base para la autenticación (`email`, `password_hash`, `estado_activo`).
* **Clientes**: Extiende a `Usuarios` con datos como `nombre`, `celular` y `puntos_fidelidad`.
* **Personales**: Extiende a `Usuarios` con `nombre_completo`, `celular`, `fecha_contratacion` y un **rol** (`ENUM`: Administrador, Cocinero, Repartidor, etc.).

### Entidades de Producto y Logística

* **Productos**: Gestión del inventario (`nombre`, `precio_base`, `stock_actual`, `requiere_personalizacion`).
* **Direcciones**: Almacena las direcciones de envío asociadas a un `Cliente`.

### Entidades Transaccionales

* **Pedidos**: La tabla central. Contiene las FK a `Cliente`, `Direccion` y `Personal` asignado, además de información transaccional (`fecha_pedido`, `costo_total`, `estado ENUM`, `metodo_pago ENUM`).
* **Detalle_Pedidos**: Rompe la relación N:M entre `Pedidos` y `Productos`, guardando la `cantidad`, `precio_unitario_final` y `notas_especiales` para cada artículo en un pedido.

---

## 🛠 Instrucciones de Configuración y Ejecución

Asegúrate de tener **Node.js** y **PostgreSQL** instalados en tu sistema.

### 1. Configuración del Backend (NestJS)

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL-DEL-REPOSITORIO]
    cd backend-app
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configuración de la Base de Datos:**
    Crea un archivo `.env` en la raíz de la carpeta `backend-app` y define las variables de conexión a PostgreSQL:
    ```env
    PORT=3000
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=user
    DB_PASSWORD=password
    DB_DATABASE=nombre_de_la_db
    ```
4.  **Ejecutar la aplicación (Desarrollo):**
    ```bash
    npm run start:dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

### 2. Configuración del Frontend (Vue.js + Bootstrap)

1.  **Navegar a la carpeta del frontend:**
    ```bash
    cd ../frontend-app
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar la aplicación:**
    ```bash
    npm run dev
    ```
    El frontend se abrirá generalmente en `http://localhost:5173`.

---

## 🔑 Endpoints Principales (a Implementar)

| Módulo | Método | Ruta | Descripción |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/register` | Registro de nuevos Clientes. |
| **Auth** | `POST` | `/auth/login` | Autenticación y obtención de token JWT. |
| **Pedidos** | `POST` | `/pedidos` | Crear un nuevo pedido. |
| **Pedidos** | `GET` | `/pedidos/cliente/:id` | Obtener historial de pedidos de un cliente. |
| **Productos** | `GET` | `/productos` | Listar productos disponibles (visibles para clientes). |
| **Personal** | `GET` | `/personal/pedidos` | Obtener pedidos asignados (Requiere rol de Personal). |
