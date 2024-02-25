const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // Importar el plugin de paginación

const cartSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }]
});

cartSchema.plugin(mongoosePaginate); // Aplicar el plugin al esquema

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;