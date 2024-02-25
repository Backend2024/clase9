# Proyecto E-commerce Backend con Websockets, MongoDB y Paginación

## Descripción
Este proyecto es la continuación del servidor backend para un e-commerce. Incorpora Websockets para actualizaciones en tiempo real, utiliza Handlebars como motor de plantillas y MongoDB con Mongoose para la persistencia de datos. Con la reciente integración de la paginación, se mejora la gestión de grandes volúmenes de datos, optimizando las consultas y la experiencia del usuario.

## Requisitos del Entregable
- Persistencia de productos y carritos en MongoDB.
- Actualizaciones en tiempo real con Websockets.
- Uso de Handlebars para la generación de vistas.
- Implementación de paginación con `mongoose-paginate-v2`.

## Objetivos Alcanzados
- CRUD completo para productos y carritos con soporte de MongoDB.
- Actualización en tiempo real de productos y carritos utilizando Websockets.
- Renderizado del lado del servidor con vistas de Handlebars.
- Paginación eficiente de productos y carritos implementada con `mongoose-paginate-v2`.

## Instalación y Ejecución
Instala las dependencias del proyecto ejecutando:  

```
npm install  
```  

Inicia el servidor con:  

```
npm start  
```  

## Estructura de Archivos y Directorios

Proyecto/  
│  
├── src/  
│   ├── dao/                 # Acceso a datos para MongoDB y FileSystem  
│   │   ├── Cart.js  
│   │   ├── CartManager.js  
│   │   ├── Product.js  
│   │   └── ProductManager.js  
│   ├── models/              # Modelos Mongoose  
│   │   ├── Cart.js  
│   │   └── Product.js  
│   ├── public/              # Archivos estáticos  
│   ├── routes/              # Rutas para productos y carritos  
│   │   ├── cartRoutes.js  
│   │   └── productRoutes.js  
│   ├── views/               # Plantillas Handlebars  
│   │   ├── chat.handlebars  
│   │   ├── layouts/  
│   │   ├── home.handlebars  
│   │   └── realTimeProducts.handlebars  
│   └── app.js               # Configuración de servidor Express y Socket.io
│  
├── data/                    # Almacenamiento de datos (FileSystem)  
│   ├── carts.json  
│   └── products.json  
│  
├── .gitignore  
├── package.json  
├── package-lock.json  
└── README.md  

## Uso  

- Visualización en Tiempo Real: Accede a /realtimeproducts para ver y administrar productos en tiempo real.  
- Chat en Vivo: Utiliza el endpoint /chat para interactuar con el chat en tiempo real.  
- API de Productos y Carritos: Interactúa con las APIs en /api/products y /api/carts para realizar operaciones CRUD.  
- Paginación: Las listas de productos y carritos ahora incluyen paginación para una mejor experiencia de usuario y rendimiento.  

## Pruebas

Para garantizar que el backend funcione correctamente, puedes realizar pruebas tanto con un explorador web como con Postman.

### Pruebas con Explorador Web

1. **Visualización de Productos**: Navega a `http://localhost:8080/api/products` para ver la lista de productos. Deberías poder ver los productos paginados si la paginación está implementada.

2. **Chat en Vivo**: Accede a `http://localhost:8080/chat` para probar la funcionalidad del chat en tiempo real.

3. **Gestión de Carritos**: Visita `http://localhost:8080/api/carts` para crear y gestionar carritos de compras.

### Pruebas con Postman

1. **Obtener Productos**: Envía una solicitud GET a `http://localhost:8080/api/products`. Agrega parámetros de consulta para paginación, como `?page=1&limit=10`.

2. **Agregar Producto**: Configura una solicitud POST a `http://localhost:8080/api/products` con un cuerpo JSON que contenga los detalles del producto.

3. **Actualizar Producto**: Para actualizar un producto, envía una solicitud PUT a `http://localhost:8080/api/products/{id}` con el cuerpo JSON del producto actualizado.

4. **Eliminar Producto**: Envía una solicitud DELETE a `http://localhost:8080/api/products/{id}` para eliminar un producto específico.

5. **Gestión de Carritos**: Usa solicitudes POST, GET, PUT y DELETE a `http://localhost:8080/api/carts` para probar la creación, consulta, actualización y eliminación de carritos y sus productos.

Recuerda actualizar las URLs y los endpoints según la configuración y el puerto de tu aplicación.

### Herramientas de Pruebas

- **Explorador Web**: Cualquier navegador moderno como Chrome, Firefox, Safari, etc.
- **Postman**: Una aplicación para simplificar las pruebas y la gestión de APIs. Descarga e instala Postman desde [su sitio web](https://www.postman.com/).

### Notas Adicionales

- Asegúrate de que tu servidor esté ejecutándose antes de realizar las pruebas.
- Si modificaste los endpoints o la lógica de negocio, ajusta las solicitudes de prueba según sea necesario.
- Utiliza los datos de ejemplo proporcionados en `data/products.json` para realizar pruebas consistentes.

## Contribuciones  

Si deseas contribuir a este proyecto, por favor envía un pull request con tus sugerencias o contacta a los administradores del proyecto.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.

## Autores y Agradecimientos
[Gona79] - Desarrollo Inicial  
Contribuyentes y revisores que han participado en el proyecto.  
Agradecimientos especiales a todos los que proporcionaron feedback y sugerencias.  
