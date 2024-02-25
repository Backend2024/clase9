const fs = require('fs').promises;

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
        this.nextId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    }

    async readFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async writeToFile() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            throw new Error("Error al escribir en el archivo");
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        await this.readFromFile();
        if (this.products.some(product => product.code === code)) {
            throw new Error("El código del producto ya existe");
        }
        const newProduct = {
            id: this.nextId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        await this.writeToFile();
    }

    async getProducts() {
        await this.readFromFile();
        return this.products;
    }

    async getProductById(id) {
        await this.readFromFile();
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    async updateProduct(id, updatedProduct) {
        await this.readFromFile();
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }
        this.products[index] = {...this.products[index], ...updatedProduct};
        await this.writeToFile();
    }

    async deleteProduct(id) {
        await this.readFromFile();
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }
        this.products.splice(index, 1);
        await this.writeToFile();
    }
}

module.exports = ProductManager;