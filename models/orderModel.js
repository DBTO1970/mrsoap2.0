import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    
    street: String,
    city: String,
    stateUS: String,
    zipCode: String,
  });

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: {
        type: addressSchema,
        required: true,
    },
    deliveryType: {
        type: String,
        required: true,
        default: 'shipping'

    },
    phone: {
        type: String,
        required: true,
    },
    shipped: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array
    },
    total: {
        type: Number
    },
    paymentId: {
        type: String
    },
    method: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    },
    dateOfPayment: {
        type: Date
    }
}, {
    timestamps: true,
})

let Dataset = mongoose.models.order || mongoose.model('order', orderSchema) || mongoose.model('address', addressSchema)
export default Dataset