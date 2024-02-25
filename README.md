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

## Contribuciones  

Si deseas contribuir a este proyecto, por favor envía un pull request con tus sugerencias o contacta a los administradores del proyecto.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.

## Autores y Agradecimientos
[Gona79] - Desarrollo Inicial
Contribuyentes y revisores que han participado en el proyecto.
Agradecimientos especiales a todos los que proporcionaron feedback y sugerencias.