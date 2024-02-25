const Product = require('../models/Product');

class ProductManager {
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const product = await Product.create({ title, description, price, thumbnail, code, stock });
            return product;
        } catch (error) {
            throw new Error("Error al añadir producto: " + error.message);
        }
    }

    async getProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error("Error al obtener productos: " + error.message);
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            throw new Error("Producto no encontrado: " + error.message);
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
            return product;
        } catch (error) {
            throw new Error("Error al actualizar producto: " + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error al eliminar producto: " + error.message);
        }
    }
}

module.exports = ProductManager;