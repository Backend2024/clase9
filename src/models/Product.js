const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // Importar el plugin de paginación

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true }
});

productSchema.plugin(mongoosePaginate); // Aplicar el plugin al esquema

const Product = mongoose.model('Product', productSchema);
module.exports = Product;