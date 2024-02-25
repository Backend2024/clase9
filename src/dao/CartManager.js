const fs = require('fs').promises;

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCarts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2), 'utf8');
        } catch (error) {
            throw new Error("Error al escribir en el archivo de carritos");
        }
    }

    async createCart() {
        const newCart = {
            id: this.carts.length + 1, // Esto solo es una simplificación. Deberías generar un ID único y seguro.
            items: []
        };
        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
    }

    async getCartById(cartId) {
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        return cart;
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        const productIndex = cart.items.findIndex(item => item.productId === productId);
        
        if (productIndex !== -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await this.saveCarts();
        return cart;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        const productIndex = cart.items.findIndex(item => item.productId === productId);
        
        if (productIndex === -1) {
            throw new Error("Producto no encontrado en el carrito");
        }

        cart.items.splice(productIndex, 1);
        await this.saveCarts();
    }
}

module.exports = CartManager;