/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { ImageUpload } from '../../utils/imageUpload'
import { postData, getData, putData } from '../../utils/fetchData'
import { useRouter } from 'next/router'


const ProductsManager = () => {
    const initialState = {
        name: "",
        price: 6,
        inStock: 10,
        weight: 4,
        description: "",
        ingredients: 
            "Charleston Coffee Exchange coffee & coffee infused oil, Saponified Olive & Coconut Oils, Sunflower Oil, Avocado Oil, Castor Oil, Rose Clay and 100% phthalate-free Fragrance Oil",
        category: "",
        dateReady: new Date(Date.now()),
    }
    const [product, setProduct] = useState(initialState)
    const {name, price, inStock, weight, description, ingredients, category, dateReady} = product

    const [images, setImages] = useState([])
    // const [reviews, setReviews] = useState()
    const {state, dispatch} = useContext(DataContext)
    const {categories, auth} = state

    const router = useRouter()
    const {id} = router.query
    const [onEdit, setOnEdit] = useState(false)

    useEffect(()=> {
        if(id) {
            setOnEdit(true)
            getData(`product/${id}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
                // setReviews(res.product.reviews)


            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
            // setReviews([])
        }
    }, [id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
        dispatch({type: "NOTIFY", payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]
        
        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'File does not exist'}}) 

        files.forEach(file => {
            if(file.size > (1024 * 1024 * 5)) 
            return err = 'Largest image size is 5mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') 
            return err = 'File type must be jpeg or png' 

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })
        
        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images'}})
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin') 
        return dispatch({type: 'NOTIFY', payload: { error: 'Authentication is not valid'}})


        if(!name || !description)
        return dispatch({type: 'NOTIFY', payload: { error: 'Please add all the required fields'}})
        
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await ImageUpload(imgNewURL)

        let res;

        if(onEdit) {
            res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: { error: res.err}})
        } else {
            res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: { error: res.err}})
        }

        

        return dispatch({type: 'NOTIFY', payload: { success: res.msg}})
    }


    return (
        <div className='products_manager'>
            <Head>
                <title>Product Manager</title>
            </Head>
            <h2 className='text-center'>Product Manager</h2>
            <div>
                <button className='btn btn-dark' onClick={() => router.back() }>
                    <i className='fas fa-arrow-left' aria-hidden="true" ></i> Back
                </button>
            </div>

            <form className='row' onSubmit={handleSubmit}>
                
                <div className='col-md-6'>
                
                    <input type="text" name="name" value={name} placeholder='Product Name' className='d-block my-4 w-100 p-2' onChange={handleChangeInput}/>

                    <div className='row'>
                        <div className='col-sm-6'>
                        <div className='form-group'>
                            <label htmlFor='price'>Price $: </label>
                            <input type="number" name="price" value={price} className='d-block w-100 p-2' onChange={handleChangeInput}/>
                        </div>
                        
                        </div>
                        <div className='col-sm-6'>
                        <div className='form-group'>
                            <label htmlFor='weight'>Weight (Oz):</label>
                            <input type="number" name="weight" value={weight} className='d-block w-100 p-2' onChange={handleChangeInput}/>
                        </div>
                        
                        </div>

                        <div className='col-sm-6'>
                        <div className='form-group'>
                            <label htmlFor='inStock'>In Stock (Qty):</label>
                            <input type="number" name="inStock" value={inStock} className='d-block w-100 p-2' onChange={handleChangeInput}/>
                        </div>
                        
                        </div>
                        <div className='col-sm-6'>
                        <div className='form-group'>
                            <label htmlFor='dateReady'>Date Ready:</label>
                            <input type="date" name="dateReady" value={dateReady} className='d-block w-100 p-2' onChange={handleChangeInput}/>
                        </div>
                        
                        </div>
                    </div>
                    <label htmlFor='description'>Description:</label>
                    <textarea name="description" id="description" cols="60" rows="4" placeholder='Description' className='d-block my-1 w-100 p-2' onChange={handleChangeInput} value={description} />
                    <label htmlFor='ingredients'>Ingredients:</label>
                    <textarea name="ingredients" id="ingredients" cols="60" rows="6" placeholder='Ingredients' className='d-block my-1 w-100 p-2' onChange={handleChangeInput} value={ingredients} />

                    <div className='input-group-prepend px-0 my-2'>
                        <select name="category" id="category" value={category} onChange={handleChangeInput} className='custom-select text-capitalize'>
                            
                            <option value="all">All Products</option>
                            
                            {
                                categories.map(category => 
                                   (<option key={category._id} value={category._id} >
                                        {category.name}
                                    </option>)
                                )
                            }
                        </select>
                    </div>
                    <button type="submit" className='btn btn-info mb-3 px-4'>
                    {onEdit ? 'Update' : 'Create'}
                </button>
                </div>
                <div className='col-md-6 my-4'>
                    <div className='input-group mb-3'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Image Upload</span>
                            </div>
                            <div className='custom-file border rounded' >
                                <input type='file' className='custom-file-input' onChange={handleUploadInput} multiple accept="image/*" style={{cursor:"pointer"}} />
                            </div>
                            <div className='row img-up mx-0' style={{overflow: "scroll"}} >
                                {
                                    images.map((img, index) => (
                                        <div key={index} className='file_img' >
                                            <img src={img.url ? img.url : URL.createObjectURL(img)} 
                                            alt="" className='img-thumbnail rounded' />

                                            <span onClick={() => deleteImage(index)}>X</span>
                                        </div>
                                    ))
                                }
                            </div>
                           
                    </div>
                </div>
                
            </form>

            
        </div>
    )
}

export default ProductsManager