const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true }
});

// Aplicar el plugin de paginación al esquema
productSchema.plugin(mongoosePaginate);

// Crear índices para campos utilizados frecuentemente en las consultas
productSchema.index({ code: 1 }); // Índice para el código del producto
productSchema.index({ price: 1 }); // Índice para el precio del producto
productSchema.index({ title: 'text' }); // Índice de texto para el título del producto

const Product = mongoose.model('Product', productSchema);

module.exports = Product;