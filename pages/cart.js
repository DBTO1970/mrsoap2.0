/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/cart/CartItem'
import { getData, postData } from '../utils/fetchData'
import { useRouter } from 'next/router'


const Cart = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth, orders, categories } = state
    const [total, setTotal] = useState(0)
    const [shippingTotal, setShippingTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [deliveryType, setDeliveryType] = useState('shipping')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [stateUS, setStateUS] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phone, setPhone] = useState('')
    const address = {street, city, stateUS, zipCode}
    const [callback, setCallback] = useState(false)
    const router = useRouter()
    

    useEffect(()=>{
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(res)
        }

        // const getDiscount = () => {
        //     const res = cart.reduce((prev, item) => {
        //         return prev + (item.quantity)
        //     }, 0)
        //     setDiscount(res >= 4 ? res : 0)
        // }

        const getShippingQuantity = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.quantity)
            }, 0)
            setShippingTotal(res > 10 || res === 0 ? 0 : 7.50)
        }

        getTotal()
        // getDiscount()
        getShippingQuantity()

        
    }, [cart])

    useEffect(() => {
        if (deliveryType == 'in-person') {
            setStreet('In ')
            setCity('Person ')
            setStateUS('Delivery ')
            setZipCode('Selected')
        } 
    }, [address])



    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('__morningrs__cart01__user01'))
        if(cartLocal && cartLocal.length > 0) {
            let newArr = []

            const updateCart = async () => {
                for (const item of cartLocal) {
                    const res = await getData(`product/${item._id}`)
                    const { _id, name, images, price, inStock, sold, category } = res.product 
                    if(inStock > 0) {
                        
                        newArr.push({ 
                            _id, name, images, price, inStock, sold, category,
                            quantity: item.quantity > inStock ? 1 : item.quantity 
                        })
                        
                    } 
                    
                }

                dispatch({type: "ADD_CART", payload: newArr })
            }
            updateCart()
        }
    }, [callback])


    const handlePayment = async () => {
              
        if(!address || !phone)
        return dispatch({ type: 'NOTIFY', payload: {error: 'Please complete shipping information.'}})
        
        let newCart = []

        for(const item of cart) {
            const res = await getData(`product/${item._id}`)
            if(res.product.inStock - item.quantity >= 0) {
                newCart.push(item)
                
            }
        }
        
        
        if(newCart.length < cart.length) {
            setCallback(!callback)
            return dispatch({ type: 'NOTIFY', payload: {error: 'The product is out of stock or limited in quantity.'}})
        }

        dispatch({ type: 'NOTIFY', payload: {loading: true}})
        
        postData('order', { address, phone, cart, total }, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}})

            dispatch({ type: 'ADD_CART', payload: [] })

            const newOrder = {
                ...res.newOrder,
                user: auth.user
            }
            dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
            dispatch({ type: 'NOTIFY', payload: {success: res.msg}})
            const data = {
                user: auth.user,
                order: newOrder,
            }
            

            return router.push(`/order/${res.newOrder._id}`)
        })
        

    } 

    const handleShipping = () => {
        setStreet('')
        setCity('')
        setStateUS('')
        setZipCode('')
        setDeliveryType('shipping')
    }

    const handlePickup = async () => {
        
              
        if(!phone)
        return dispatch({ type: 'NOTIFY', payload: {error: 'Please complete delivery information.'}})
        setStreet('In ')
        setCity('Person ')
        setStateUS('Pickup ')
        setZipCode('Selected')

        let newCart = [];

        for(const item of cart) {
            const res = await getData(`product/${item._id}`)
            if(res.product.inStock - item.quantity >= 0) {
                newCart.push(item)
            }
        }
        
        if(newCart.length < cart.length) {
            setCallback(!callback)
            return dispatch({ type: 'NOTIFY', payload: {error: 'The product is out of stock or limited in quantity.'}})
        }

        dispatch({ type: 'NOTIFY', payload: {loading: true}})
        
        postData('order', { address, phone, cart, total }, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}})

            dispatch({ type: 'ADD_CART', payload: [] })

            const newOrder = {
                ...res.newOrder,
                user: auth.user
            }
            
            dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
            dispatch({ type: 'NOTIFY', payload: {success: res.msg}})
            
            const data = {
                user: auth.user,
                order: newOrder,
            }
            fetch('/api/orderConfirmation/orderConfirmPickup', {
                method: 'POST',
                body: JSON.stringify(data),
            })

            return router.push(`/order/${res.newOrder._id}`)
        })
        

    } 

    if(cart.length === 0) 
        return (
            <div className='container' >
            <Link href={'/'} passHref >
                        <button className='btn btn-dark my-3' onClick={() => router.push('/')} style={{boxShadow: "2px 2px 2px gray"}}><i className="fas fa-arrow-left" aria-hidden="true" ></i> Keep Browsing </button>
                    </Link>
                <div  className='text-center' >
                    <h2>Your basket is empty</h2>
                    <img className="img-responsive mx-auto" style={{height: 'auto', width:'50%', borderRadius: '50px'}} src="/empty_basket.jpg" alt="empty_basket.jpg" />
                </div>
            </div>
        )

        return (
            <div className='row mx-auto' >
                <Head>
                    <title>Basket</title>
                </Head>
                <div className='col-md-12'>
                    <Link href={'/'} passHref >
                        <button className='btn btn-dark mx-auto my-2' onClick={() => router.push('/')} style={{boxShadow: "2px 2px 2px gray"}} ><i className="fas fa-arrow-left" aria-hidden="true" ></i> Keep Browsing </button>
                    </Link>
                </div>
                
                <div className='col-md-6 text-secondary table-responsive my-3'>
                    
                    <h1>Your Shopping Basket</h1>
                    <table className='table my-2'>
                        <tbody>
                            {
                                cart.map(item => (
                                    <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                                    ))
                            }
                        
                        </tbody>
                    </table>
                    <div>
                    <p>All orders shipped via standard USPS & all shipping is within the US only.  Shipping is a flat rate of $7.50 on orders up to 10 bars.  Orders of 11 or more bars ship for free. Shipping total calculated at check-out.</p>
                    {/* <p className='text-danger'>Holiday Special! All soap bars are $5 each when you buy 4 or more (discount applied automatically at checkout)</p> */}
                    </div>
                    
                </div>
                <div className='col-md-4 my-3 text-right text-secondary'>
                    <h2>Delivery Details</h2>
                    {/* <div>
                            <label style={{padding: "10px"}}>
                            <input type="radio" name='delivery' id="shipping" value="shipping" onChange={e => handleShipping()} style={{margin: "10px"}} defaultChecked />
                              Shipping  
                            </label>
                            <label>
                            <input type="radio" name='delivery' id="in-person" value="in-person" onChange={e => setDeliveryType(e.target.value)} style={{margin: "10px"}} />
                              In-Person Pickup  
                            </label>
                    </div> */}
                    <div>
                            <form>
                            {
                                auth.user ? 
                                <div>
                                <h6>email</h6>
                                <h6>{auth.user.email}</h6> 
                                </div>
                                :
                                <div>
                                    <p>Already have an accout? <span><Link href="/signin"><a style={{color: 'crimson', paddingLeft: '5px'}}> Sign In</a></Link> or <Link href="/register"><a style={{color: 'crimson'}}> Register</a></Link></span></p>
                                </div>
                                    
                            }
                                <div>
                                <label htmlFor='street' style={{marginTop: '20px'}} > Street Address</label>
                                    <input 
                                    className="form-control"
                                    id="street" 
                                    name="street" 
                                    value={street}
                                    placeholder='1234 Main Street' 
                                    type="text" 
                                    onChange={e => setStreet(e.target.value)} 
                                    
                                    />
                                </div>
                                    
                                    
                                <label htmlFor='city' style={{marginTop: '20px'}} > City</label>
                                <input 
                                    className="form-control"
                                    id="city" 
                                    name="city" 
                                    value={city}
                                    placeholder='Your City' 
                                    type="text" 
                                    onChange={e => setCity(e.target.value)} 
                              
                                />

                                    <label htmlFor='stateUS' style={{marginTop: '20px'}} > State</label>
                                <input 
                                    className="form-control"
                                    id="state" 
                                    name="stateUS" 
                                    value={stateUS} rows="5" 
                                    placeholder='Your State' 
                                    type="text" 
                                    onChange={e => setStateUS(e.target.value)} 
                               
                                />
                                <label htmlFor='zipCode' style={{marginTop: '20px'}} > Zipcode</label>
                                <input 
                                    className="form-control"
                                id="zipCode" 
                                name="zipCode" 
                                value={zipCode} rows="5" 
                                placeholder='Zipcode' 
                                type="text" 
                                onChange={e => setZipCode(e.target.value)} 
                                
                                />

                                <label htmlFor='phone' style={{marginTop: '20px'}} > Phone</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    id="phone" 
                                    className="form-control mb-2" 
                                    placeholder='Your Phone Number'
                                    value={phone} 
                                    onChange={e => setPhone(e.target.value)} 
                                
                                />
                                    
                            </form>
                                { discount > 0 ? 
                                <div>
                                    <h5>Total: <span className='text-info'>{(total = total - discount).toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</span></h5>
                                    <h6 className='text-danger'>Sale Price of $5 per bar applied</h6>
                                </div>
                                : <div>
                                    <h5>Total: <span className='text-info'>{total.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</span></h5>
                                </div>
                                }
                                <h5>Shipping: <span className='text-info'>{shippingTotal.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</span></h5>
                                {/* <h6 className='text-danger'>*Free Shipping on 11 bars or more*</h6> */}
                                <h4>Order Total: <span className='text-danger'>{((total = total + shippingTotal)).toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</span></h4>
                              
                                
                                <Link href={auth.user ? '#!' : '/signin'} passHref >
                                    <a className='btn btn-dark my-2' onClick={handlePayment} >
                                        Proceed with payment
                                    </a>
                                </Link>
                                

                        </div>
                    
                    
                </div>
            </div>
        )
}

export default Cart


