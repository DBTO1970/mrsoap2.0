/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import {DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { useRouter } from 'next/router'



const ProductDetail = (props) => {
    const [product] = useState(props.product)
    const [reviews, setReviews] = useState(product.reviews)
    const [review, setReview] = useState('')
    const [reviewer, setReviewer] = useState('')
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    const router = useRouter()

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const data = {
    //         reviewer, 
    //         review
    //     }

    //     fetch(`/api/product/[id]`, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //     })


    // }

    if(!auth.user) return (
        <div className='detail_page'>
            <Head>
                <title>Product Details</title>
            </Head>
            <div className='container'>
                <div>
                    <button className='btn btn-dark' onClick={() => router.back() }>
                        <i className='fas fa-arrow-left' aria-hidden="true" ></i> Back
                    </button>
                </div>
            
                <div className='row'>
                {/* <div className='pt-2 text-center'>
                    <h4 className='text-danger'>Holiday Special!</h4>
                    <h5 className='text-danger'>All bars $5 each when you buy 4 or more (Mix & Match, discount applied at checkout)</h5>
                </div> */}
                {/* <h4 className='text-danger pt-2'>$5 each when you buy 4 or more (discount applied at checkout)</h4> */}
                    <div className='col-md-6'>
                        {
                            product.images.length === 0 ? 
                            <img src='/soap-img-placeholder.jpg' alt='/soap-img-placeholder.jpg' className='d-block img-thumbnail rounded mt-4 w-100' style={{height: '150px, width: "auto'}} /> 
                            : <img src={product.images[tab].url} alt={product.images[tab].url} className='d-block img-thumbnail rounded mt-4 w-100' style={{height: '150px, width: "auto'}} />
                        }
                        <div className='row mx-0' style={{cursor: 'pointer'}} >

                            {product.images.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img.url} 
                                    alt={img.url} 
                                    className={`img-thumbnail rounded ${isActive(index)}`} style={{height:'auto', width: '30%'}} 
                                    onClick={() => setTab(index)}
                                    />
                            ))}
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <h3 className='text-capitalize mt-4' >{product.name}</h3>
                            <p>{product.description}</p>
                            <hr />
                        <h3>Ingredients</h3>
                        <p>{product.ingredients}</p>
                        <hr />
                        <div style={{textAlign: 'left'}}>
                            <h6 className="text-dark" >Price <span className='text-small'>per </span>bar: {product.price.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</h6>
                            
                            {
                                product.weight > 0 ? 
                                <h6 className='text-dark'>Weight: {product.weight} oz. <span className='text-danger small'>(approximate post-cure weight)</span></h6> 
                                : <span></span>
                            }
                            
                            {
                                product.inStock <= 0 ? 
                                <h6 className="text-danger"> Out of Stock</h6> 
                                : new Date(product.dateReady) <= new Date(Date.now()) ?
                                <h6 className="text-dark">In Stock: {product.inStock} </h6>
                                : <h6 className="text-info"> Comming Soon: {new Date (product.dateReady).toLocaleDateString()} </h6> 
                            }
                        </div>
                        
                        <div className="row justify-content-center align-content-center" style={{marginTop: '20px'}}>
                            {
                                new Date(product.dateReady) >= new Date(Date.now()) ? 
                                    <button className='btn btn-success text-center' 
                                        style={{width: '150px', 
                                        margin: '1px 5px 1px 2px'}} 
                                        disabled 
                                        onClick={() => dispatch(addToCart(product, cart))} >
                                        <i className="fas fa-shopping-basket" style={{margin: '0 3px'}} aria-hidden="true" ></i>  
                                        Coming Soon 
                                    </button>
                                :   <button className='btn btn-success text-center'
                                        style={{marginLeft: '5px'}} 
                                        disabled={product.inStock === 0 ? true : false }
                                        onClick={() => dispatch(addToCart(product, cart))} >
                                        <i 
                                            className="fas fa-shopping-basket" 
                                            style={{margin: '0 5px'}} 
                                            aria-hidden="true" 
                                            ></i>  
                                        Add to Basket
                                    </button>
                            }   
                        </div>
                        
                    </div>
                </div>
                </div>
            
        </div>
    );

    return (
        <div className='row detail_page'>
            <Head>
                <title>Product Details</title>
            </Head>
            <div className='col-12'>
                <button className='btn btn-dark' onClick={() => router.back() }>
                            <i className='fas fa-arrow-left' aria-hidden="true" ></i> Back
                </button>
            </div>
            
            <div className='col-md-6'>
            {
                product.images.length === 0 ? 
                <img src='/soap-img-placeholder.jpg' alt='/soap-img-placeholder.jpg' className='d-block img-thumbnail rounded mt-4 w-100' style={{height: '150px, width: "auto'}} /> 
                : <img src={product.images[tab].url} alt={product.images[tab].url} className='d-block img-thumbnail rounded mt-4 w-100' style={{height: '150px, width: "auto'}} />
            }
                <div className='row mx-0' style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img 
                            key={index} 
                            src={img.url} 
                            alt={img.url} 
                            className={`img-thumbnail rounded ${isActive(index)}`} style={{height:'auto', width: '30%'}} 
                            onClick={() => setTab(index)}
                            />
                    ))}
                </div>
            </div>
            <div className='col-md-6'>
                <h3 className='text-capitalize mt-4' >{product.name}</h3>
                    <p>{product.description}</p>
                    <hr />
                <h3>Ingredients</h3>
                <p>{product.ingredients}</p>
                <hr />
                <div style={{textAlign: 'left'}}>
                    <h6 className="text-dark" >Price <span className='text-small'>per </span>bar: {product.price.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</h6>
                    {
                        product.weight > 0 ? 
                        <h6 className='text-dark'>Weight: {product.weight} oz.</h6> 
                        : <span></span>
                    }
                    
                        {
                            product.inStock <= 0 ? 
                            <h6 className="text-danger"> Out of Stock</h6> 
                            : <div>
                                <h6 className="text-dark">In Stock: {product.inStock} </h6>
                                {
                                    new Date(product.dateReady) > new Date(Date.now()) ? 
                                    <h6 className="text-danger"> Date Ready: {new Date(product.dateReady).toLocaleDateString()}</h6>
                                    : <></>
                                    }
                            </div>
                        }
                        
                        {
                            auth.user.role !== 'admin' ? 
                            <></>
                            : <h6 className='text-dark'>Sold: {product.sold}</h6>
                        }
                        
                </div>
                
                <div className="row justify-content-center align-content-center" style={{marginTop: '20px'}}>
            
                
                {
                    new Date(product.dateReady) > new Date(Date.now()) ? 
                        <button className='btn btn-success text-center' 
                        style={{width: '150px', 
                        margin: '1px 5px 1px 2px'}} 
                        disabled 
                        onClick={() => dispatch(addToCart(product, cart))} >
                        <i className="fas fa-shopping-basket" style={{margin: '0 3px'}} aria-hidden="true" ></i>  
                        Coming Soon 
                    </button>
                : <button className='btn btn-success text-center'
                    style={{marginLeft: '5px'}} 
                    disabled={product.inStock === 0 ? true : false }
                    onClick={() => dispatch(addToCart(product, cart))} >
                    <i 
                        className="fas fa-shopping-basket" 
                        style={{margin: '0 5px'}} 
                        aria-hidden="true" 
                        ></i>  
                    Add to Basket
                </button>
                }
        
                </div>
                
            </div>
            <div>
            
            </div>
        </div>
    )

}


export async function getServerSideProps({params: {id}}) {

    const res = await getData(`/product/${id}`)
   //server side rendering
    return {
      props: { product: res.product }, // will be passed to the page component as props
    }
  }

export default ProductDetail

