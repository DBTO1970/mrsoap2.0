/* eslint-disable import/no-anonymous-default-export */
import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProducts(req, res)
            break;
    }
}

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.category !== 'all') 
            this.query.find({category: queryObj.category})
        if(queryObj.name !== 'all') 
            this.query.find({name: {$regex: queryObj.name}})

        this.query.find()
        return this;
    }

    sorting(){
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 20
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getProducts = async (req, res) => {
    try {
        const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()

        const products  = await features.query
        
        // const products = await Products.find()
        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}

const createProducts = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(500).json({err: 'Authentication is not valid'})

        const {name, price, inStock, weight, description, ingredients, category, images, dateReady} = req.body

        if(!name || !price || !inStock || !description || !ingredients || !dateReady)
        return res.status(400).json({err: 'Please add all the required fields'})

        
        
        const newProduct = new Products ({name: name.toLowerCase(), price, inStock, weight, description, ingredients, category, images, dateReady})

        await newProduct.save()

        res.json({msg: 'Success! New product created.'})

    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}