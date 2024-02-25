const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cartSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }],
    // Puedes agregar más campos si es necesario
});

cartSchema.plugin(mongoosePaginate);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;