const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const ProductManagerDB = require('../src/dao/Product'); // Manager para MongoDB
const ProductManagerFS = require('../src/dao/ProductManager'); // Manager para FileSystem
const CartManagerDB = require('../src/dao/Cart'); // Manager para MongoDB
const CartManagerFS = require('../src/dao/CartManager'); // Manager para FileSystem

// MongoDB Atlas configuration
const atlasUsername = 'CoderUser';
const atlasPassword = 'Linakr7crMUApDsK';
const atlasCluster = 'codercluster.eirlcsk.mongodb.net';
const dbName = 'CoderCluster';

// Mongoose connection string
const mongoDBAtlasUrl = `mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasCluster}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDBAtlasUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Decide which manager to use based on the database connection status
const productManager = mongoose.connection.readyState === 1 ? new ProductManagerDB() : new ProductManagerFS('./data/products.json');
const cartManager = mongoose.connection.readyState === 1 ? new CartManagerDB() : new CartManagerFS('./data/carts.json');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('newProduct', async (productData) => {
        try {
            await productManager.addProduct(productData);
            io.emit('productListUpdated', await productManager.getProducts());
        } catch (error) {
            console.error(error);
            socket.emit('error', 'Error al agregar producto');
        }
    });

    socket.on('deleteProduct', async (productId) => {
        try {
            await productManager.deleteProduct(productId);
            io.emit('productListUpdated', await productManager.getProducts());
        } catch (error) {
            console.error(error);
            socket.emit('error', 'Error al eliminar producto');
        }
    });

    socket.on('updateProduct', async (productData) => {
        try {
            await productManager.updateProduct(productData.id, productData);
            io.emit('productListUpdated', await productManager.getProducts());
        } catch (error) {
            console.error(error);
            socket.emit('error', 'Error al actualizar producto');
        }
    });
});

httpServer.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});