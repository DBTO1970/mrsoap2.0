import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query;

        const product = await Products.findById(id)
        if(!product) return res.status(400).json({err: "This product does not exist."})
        res.json({ product })
        

    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(500).json({err: 'Authentication is not valid'})

        const {id} = req.query
        const {name, price, inStock, weight, description, ingredients, category, images, dateReady, reviews} = req.body

        if(!name || !price || !inStock || !description || !ingredients || !dateReady)
        return res.status(400).json({err: 'Please add all the required fields'})

        await Products.findOneAndUpdate({_id: id,}, {
            name: name.toLowerCase(), price, inStock, weight, description, ingredients, category, images, dateReady, reviews
        })

        res.json({msg: 'Success! Updated a product'})

    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role !== 'admin') return res.status(500).json({err: 'Authentication is not valid'})

        const {id} = req.query

        await Products.findByIdAndDelete(id)
        res.json({msg: 'Deleted product'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

