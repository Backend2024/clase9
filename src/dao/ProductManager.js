const Product = require('../models/Product');

class ProductManager {
    // Método para añadir productos
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const product = new Product({ title, description, price, thumbnail, code, stock });
            await product.save();
            return product;
        } catch (error) {
            throw new Error("Error al añadir producto: " + error.message);
        }
    }

    // Método para obtener productos con paginación, filtrado y ordenamiento
    async getProducts(filters = {}, page = 1, limit = 10, sort = 'title', order = 'asc') {
        try {
            const queryFilters = this.buildQueryFilters(filters);
            const options = {
                page,
                limit,
                sort: { [sort]: order === 'asc' ? 1 : -1 }
            };
            const result = await Product.paginate(queryFilters, options);
            return result;
        } catch (error) {
            throw new Error("Error al obtener productos: " + error.message);
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            throw new Error("Producto no encontrado: " + error.message);
        }
    }

    // Método para actualizar un producto por su ID
    async updateProduct(id, updatedProduct) {
        try {
            const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
            return product;
        } catch (error) {
            throw new Error("Error al actualizar producto: " + error.message);
        }
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(id) {
        try {
            await Product.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error al eliminar producto: " + error.message);
        }
    }

    // Método auxiliar para construir los filtros de la consulta a partir de los parámetros de entrada
    buildQueryFilters(filters) {
        let queryFilters = {};
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                // Faltaria añadir la lógica de validación para cada filtro
                // Por ejemplo, el precio que realmente sea un número
                queryFilters[key] = filters[key];
            }
        }
        return queryFilters;
    }
}

module.exports = new ProductManager();