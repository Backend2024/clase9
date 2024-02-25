const Cart = require('../models/Cart');

class CartManager {
    async createCart() {
        try {
            const newCart = new Cart({ items: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error("Error al crear carrito: " + error.message);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await Cart.findById(cartId).populate('items.productId');
            return cart;
        } catch (error) {
            throw new Error("Carrito no encontrado: " + error.message);
        }
    }

    async addProductToCart(cartId, productId, quantity) {
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
        try {
            const cart = await this.getCartById(cartId);
            cart.items = cart.items.filter(item => !item.productId.equals(productId));
            await cart.save();
        } catch (error) {
            throw new Error("Error al eliminar producto del carrito: " + error.message);
        }
    }
}

module.exports = new CartManager();