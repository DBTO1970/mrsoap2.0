import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        trim: true,
        required: true,

    },
    weight: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    images: {
        type: Array,
        url: {
            type: String,
        }
    },
    checked: {
        type: Boolean,
        default: false
    },
    inStock: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
        
    },
    category: {
        type: String,
        required: true,
    },
    dateReady: {
        type: Date,
        required: true,
    },
    reviews: {
        type:Array,
        review: {
            type: Object,
            reviewer: {
                type: String,
            },
            review: {
                type: String,
            },
        },
    }, 
},
    {
    timestamps: true,
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset