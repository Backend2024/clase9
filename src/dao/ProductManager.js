const Product = require('../models/Product');

class ProductManager {
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const product = new Product({ title, description, price, thumbnail, code, stock });
            await product.save();
            return product;
        } catch (error) {
            throw new Error("Error al añadir producto: " + error.message);
        }
    }

    async getProducts(page = 1, limit = 10) {
        try {
            const options = {
                page,
                limit,
                sort: { title: 1 } // Ordenar por título de manera ascendente, como ejemplo
            };
            const result = await Product.paginate({}, options);
            return result;
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

module.exports = new ProductManager();