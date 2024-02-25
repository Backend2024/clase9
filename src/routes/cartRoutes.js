const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Managers
const CartManagerDB = require('../dao/Cart'); // Manager para MongoDB
const CartManagerFS = require('../dao/CartManager'); // Manager para FileSystem

// Decide qué manager usar basándose en la disponibilidad de la base de datos
const cartManager = mongoose.connection.readyState === 1 ? new CartManagerDB() : new CartManagerFS('../data/carts.json');

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para obtener un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (cart) {
            res.render('cartDetail', { cart });
        } else {
            res.status(404).send('Carrito no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para agregar un producto al carrito
router.post('/:cid/products', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const updatedCart = await cartManager.addProductToCart(req.params.cid, productId, quantity);
        res.redirect(`/carts/${req.params.cid}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
        res.send('Producto eliminado del carrito con éxito');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;