/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { increase, decrease } from '../../store/Actions'

const CartItem = ({item, dispatch, cart}) => {
    return (
        <tr>
            <td style={{width: '100px', overflow: 'hidden'}} >
            {
                    item.images.length === 0 ? 
                    
                    <img 
                    src='/soap-img-placeholder.jpg' 
                    alt='/soap-img-placeholder.jpg' 
                    className="img-thumbnail w-100" 
                    style={{minWidth: '50px', minHeight: '50px'}}
                />
                    : <img 
                    src={item.images[0].url} 
                    alt={item.images[0].url} 
                    className="img-thumbnail w-100" 
                    style={{minWidth: '50px', minHeight: '50px'}}
                />

                }
                
            </td>
            <td style={{width: '200px'}} className='w-50 align-middle'>
                <h5 className='text-secondary'>
                    <Link href={`/product/${item._id}`} passHref >
                        <a className='text-capitalize'>{item.name}</a>
                    </Link>
                </h5>
                
                <h6 className='text-primary'>
                    {/* In Basket: {item.quantity}  */}
                    In Basket: {item.quantity} bar x {item.price.toLocaleString('en-us', {style: 'currency', currency: 'USD'})} = {(item.quantity * item.price).toLocaleString('en-us', {style: 'currency', currency: 'USD'})}
                </h6>
                {
                        item.inStock > 0 
                        ? <p className='mb-1 text-dark'>In Stock: {item.inStock}</p>
                        : <p className='mb-1 text-danger'>Out of Stock</p>
                    }
                
            </td>
          
            <td className='align-middle' style={{cursor: 'pointer'}} >
                    
                <button 
                    className='btn btn-success' 
                    style={{margin: '2px', padding: '2px'}} 
                    onClick={() => dispatch(increase(cart, item._id)) } 
                    disabled={ item.quantity === item.inStock ? true : false } >
                    <i className="fas fa-plus-circle" aria-hidden="true" ></i>
                </button>
                <span 
                    className='text-dark align-middle text-center p-2' 
                    style={{fontWeight: '700' }}
                    >
                        {item.quantity}
                </span>
                <button 
                    className='btn btn-warning' 
                    style={{margin: '2px', padding: '2px'}} 
                    onClick={() => dispatch(decrease(cart, item._id)) } 
                    disabled={ item.quantity <= 1 ? true : false }
                    > 
                    <i className="fas fa-minus-circle" aria-hidden="true" ></i>
                </button>
            </td>
            <td className='align-middle' style={{ cursor: 'pointer', width:'2rem'}} >
            <i className="fas fa-trash text-danger" 
                style={{fontSize: '1.5rem'}}
                onClick={() => dispatch(({
                type: 'ADD_MODAL',
                payload: [{ 
                    data: cart, 
                    id: item._id, 
                    name: item.name, 
                    type: 'ADD_CART'
                    }]
                }))} 
                data-toggle="modal" data-target="#exampleModal" 
                aria-hidden="true" 
                ></i>
            </td>
        </tr>
    )
}

export default CartItem