// // Establece la conexión de Websockets
// const socket = io();

// // Escucha el evento 'productListUpdated' emitido por el servidor
// socket.on('productListUpdated', (products) => {
//   // Actualiza la interfaz de usuario con los nuevos productos
//   const productList = document.getElementById('productList');
//   productList.innerHTML = ''; // Limpiar la lista actual
//   products.forEach((product) => {
//     const productElement = document.createElement('li');
//     productElement.innerText = `${product.title} - $${product.price}`;
//     productList.appendChild(productElement);
//   });
// });

// // Maneja el envío del formulario de nuevo producto
// document.getElementById('newProductForm').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const title = document.getElementById('title').value;
//   const price = document.getElementById('price').value;
//   // Añadir aquí más campos si se agregan al formulario
//   const newProduct = { title, price };
  
//   socket.emit('newProduct', newProduct); // Emitir el evento con el nuevo producto
  
//   // Limpia el formulario después de enviar
//   document.getElementById('newProductForm').reset();
// });