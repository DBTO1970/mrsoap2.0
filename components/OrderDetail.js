/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import PaypalBtn from './paypalBtn'
import { patchData } from '../utils/fetchData'
import { updateItem } from '../store/Actions'


const OrderDetail = ({orderDetail, state, dispatch}) => {
    const { auth, orders } = state

    const handleShipped = (order) => {
        
        dispatch({type: 'NOTIFY', payload:{loading: true}})
        patchData(`/order/shipped/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload:{error: res.err}})

            const { paid, dateOfPayment, method, shipped } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, paid, dateOfPayment, method, shipped
            }, 'ADD_ORDERS'))
            
            const data = {
                user: auth.user,
                order: order,
            }
            fetch('/api/orderConfirmation/orderShipped', {
                method: 'POST',
                body: JSON.stringify(data),
            })

            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })

    }
    if(!auth.user) return null;
    
    return (
        <>
            {
                orderDetail.map(order => (
                    <div key={order._id} style={{margin: "20px auto"}} className='row justify-content-around'>
                        <div className='text-uppercase my-3' style={{maxWidth:'800px'}}>
                            <h4 className='text-break'>Order# <span className='small'><em>{order._id}</em></span> Has Been Placed.</h4>
                            <p>Please Provide Payment Information Below.</p>
                            <p>After payment, an Order confirmation will be sent to {order.user.email}.</p>
                            <hr />
                            <div className='mt-4 text-secondary'>
                                <h4>Shipping</h4>
                                <h6>Name: {order.user.name}</h6>
                                <h6>Email: {order.user.email}</h6>
                                <h6>Address: {order.address.street} {order.address.city}, {order.address.stateUS} {order.address.zipCode} </h6> 
                                <h6>Phone: {order.phone}</h6>

                            </div>
                            {
                        !order.paid && auth.user.role !== 'admin' &&
                        <div className='p-4'>
                            <h2 className='mb-4 text-uppercase'>Total: {order.total.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</h2>
                            <p>Please use the Paypal, Paypal Pay Later or Credit Card Options Below:</p>
                            <PaypalBtn order={order}  />
                        </div>
                    }
                            <hr />
                            <h4>Payment Status</h4>
                        
                        {
                            order.method && <p>Method: <em>{order.method}</em><span> {order.total.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</span></p>
                        }
                        {
                            order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>}
                        <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert" >
                            {
                                order.paid ? `\$${order.total} Paid on ${new Date(order.dateOfPayment).toLocaleDateString()}` : 'Payment Pending'
                            }
                        <hr />
                        </div>
                        <h4>Shipping Status</h4>
                        
                        <div className={`alert ${order.shipped ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert" >
                            {
                                order.shipped ? `Shipped on ${new Date(order.updatedAt).toLocaleDateString()}` : 'Not Shipped'
                            }

                            
                            {
                                auth.user.role === 'admin' && !order.shipped &&
                                <button className='btn btn-dark text-uppercase px-1 mx-1' onClick={() => {handleShipped(order)}}>
                                    Mark as shipped
                                </button>
                            }


                        </div>
                        
                        
                        
                        <div>
                            <hr />
                            <h4>Order Items</h4>
                            {
                                order.cart.map(item => (
                                    <div 
                                        className='row border-bottom mx-0 p-2 justify-content-between align-items-center' 
                                        key={item._id} 
                                        style={{maxWidth: '550px'}}>
                                        {
                                            item.images.length === 0 ? 
                                            
                                            <img src='/soap-img-placeholder.jpg' alt='/soap-img-placeholder.jpg' style={{width: '50px', height: '45px', objectFit: 'cover'}} />
                                            : <img src={item.images[0].url} alt={item.images[0].url} style={{width: '50px', height: '45px', objectFit: 'cover'}} />
                                        }
                                             
                                            <h5 className='flex-fill text-scondary px-3 m-0'>
                                                <Link href={`/product/${item._id}`} passHref>
                                                    <a>{item.name}</a>
                                                </Link>
                                            </h5>
                                            <span 
                                                className='text-info m-0'>Quantity: {item.quantity}
                                            </span>
                                            
                                            
                                    </div>
                                ))
                            }
                            <p className='m-0'>Order Total: {order.total.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}</p>
                        </div>
                    </div>


                    
                </div>
                        
                ))
            }
        </>
    )

}

export default OrderDetail