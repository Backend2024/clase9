const Cart = require('../models/Cart');

class CartManager {
    async createCart() {
        const newCart = new Cart({ items: [] });
        await newCart.save();
        return newCart;
    }

    async getCartById(cartId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        return cart;
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        return cart;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();
    }
}

module.exports = CartManager;