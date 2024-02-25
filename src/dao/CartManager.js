const Cart = require('../models/Cart');

class CartManager {
    constructor() {
        // Inicializar variables si es necesario
    }

    async createCart() {
        // Método para crear un nuevo carrito
        try {
            const newCart = new Cart({ items: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error("Error al crear carrito: " + error.message);
        }
    }

    async getCartById(cartId) {
        // Método para obtener un carrito por su ID con paginación en los items
        try {
            const cart = await Cart.findById(cartId).populate('items.productId');
            return cart;
        } catch (error) {
            throw new Error("Carrito no encontrado: " + error.message);
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        // Método para añadir un producto al carrito
        try {
            const cart = await this.getCartById(cartId);
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error al añadir producto al carrito: " + error.message);
        }
    }

    async removeProductFromCart(cartId, productId) {
        // Método para eliminar un producto del carrito
        try {
            const cart = await this.getCartById(cartId);
            cart.items = cart.items.filter(item => !item.productId.equals(productId));
            await cart.save();
        } catch (error) {
            throw new Error("Error al eliminar producto del carrito: " + error.message);
        }
    }

    // Método para obtener todos los carritos con paginación
    async getAllCarts(page, limit) {
        try {
            const options = {
                page: page || 1,
                limit: limit || 10,
                populate: 'items.productId'
            };
            const result = await Cart.paginate({}, options);
            return result;
        } catch (error) {
            throw new Error("Error al obtener carritos: " + error.message);
        }
    }
}

module.exports = new CartManager();