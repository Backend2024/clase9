const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Managers
const ProductManagerDB = require('../dao/Product'); // Manager para Mongoose
const ProductManagerFS = require('../dao/ProductManager'); // Manager para FileSystem

// Decide qué manager usar basándose en la disponibilidad de la base de datos
const productManager = mongoose.connection.readyState === 1 ? new ProductManagerDB() : new ProductManagerFS('../data/products.json');

// Ruta que devuelve los productos en formato JSON
router.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        res.json({ products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para la visualización y gestión en tiempo real de productos
router.get('/realtimeproducts', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para obtener los detalles de un producto específico por ID
router.get('/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (product) {
            res.render('productDetail', { product });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para añadir un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        await productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.redirect('/realtimeproducts');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para actualizar un producto específico por ID
router.put('/:pid', async (req, res) => {
    try {
        await productManager.updateProduct(req.params.pid, req.body);
        res.send('Producto actualizado con éxito');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para eliminar un producto específico por ID
router.delete('/:pid', async (req, res) => {
    try {
        await productManager.deleteProduct(req.params.pid);
        res.send('Producto eliminado con éxito');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;