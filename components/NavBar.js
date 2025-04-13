/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'
import BasketBug from './BasketBug'

function NavBar() {
    const router = useRouter()
    const { state, dispatch} = useContext(DataContext)
    const { auth, cart, orders } = state



    const isActive = (r) => {
        if(r === router.pathname) {
            return "active"
        } else {
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {}})
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'}})
        return router.push('/')
    }

    const adminRouter = () => {
        return(
            <>
                <Link href="/users" passHref >
                    <a className="dropdown-item">Users</a>
                </Link>
                <Link href="/create" passHref >
                    <a className="dropdown-item">Products</a>
                </Link>
                <Link href="/categories" passHref >
                <a className="dropdown-item">Categories</a>
                </Link>
              
            </>
        )
    }


    const loggedRouter = () => {
        const orderCount = orders.filter(order => order.paid == false || order.shipped == false);

        return (
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', 
                        width: '30px', 
                        height: '30px', 
                        transform: 'translateY(-3px)', 
                        marginRight: '3px', 
                        color: 'white',
                        boxShadow: "2px 2px 2px gray"
                    }} />
                    
                    <span className="user-name">{auth.user.name}</span>
                    {orderCount.length > 0 ? <span className='position-absolute' style={{
                                    padding: '0px 6px',
                                    background: '#407F7F',
                                    borderRadius: '50%',
                                    top: '-5px',
                                    right: '-5px',
                                    color: 'white',
                                    fontSize: '14px'
                                }}>{orderCount.length}</span> :
                                <></>
                    }
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            
            <Link href="/profile" passHref >
                <a className="dropdown-item">Profile 
                {orderCount.length > 0 ? 
                    <span style={{
                                    padding: '0px 6px', 
                                    marginLeft: '3px',
                                    background: '#407F7F',
                                    borderRadius: '50%',
                                    top: '-5px',
                                    right: '-5px',
                                    color: 'white',
                                    fontSize: '14px'
                                }}
                >{orderCount.length}</span> :
                <></>
                }
                </a>
            </Link>
            
           {
               auth.user.role === 'admin' && adminRouter() 
           }
            <Link href="#" passHref >
                <button className="dropdown-item" onClick={handleLogout} >Log Out</button>
            </Link>
            
            </div>
        </li>
        )
        
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{height:'auto', fontFamily:"Balsamiq Sans" }}>
     
            <div id="nav-title-home" className='text-center mb-2 p-2' >
                <div>
                    <Image 
                        src="/soap_banner2.png"
                        width={2000}
                        height={800}
                        alt="soap in a row"
                        placeholder='blur'
                        blurDataURL='/soap_banner2.png'
                        useMap='#workmap'
    
                    />
                    <map name="workmap">
                    <area shape="circle" coords="550, 200, 150" alt="click to go to morningritualsoap.com" href="/" />
                    
                    </map>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" style={{color: 'white'}} >
                <span className="navbar-toggler-icon" ></span>
                </button>
            <div className="collapse navbar-collapse justify-content-center mx-3 px-3" id="navbarNavDropdown" >
                <ul className="navbar-nav p-1">
                    <li className="nav-item">
                        <Link href="/">
                            <a className={"nav-link" + isActive('/')} ><i className="fas fa-store" aria-hidden="true" ></i>  Shop</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/about">
                            <a className={"nav-link" + isActive('/about')} ><i className="fas fa-soap" aria-hidden="true" ></i>  About</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/contact">
                            <a className={"nav-link" + isActive('/contact')} ><i className="fas fa-envelope" aria-hidden="true" ></i>  Contact</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/cart">
                            <a className={"nav-link" + isActive('/cart')} ><i className="fas fa-shopping-basket position-relative" aria-hidden="true" >
                                {cart.length > 0 ? <span className='position-absolute' style={{
                                    padding: '3px 6px',
                                    background: '#ed143dc2',
                                    borderRadius: '50%',
                                    top: '-10px',
                                    right: '-5px',
                                    color: 'white',
                                    fontSize: '14px'
                                }}>{cart.length}</span> : <></>}
                            </i>  Basket</a>
                        </Link>
                        
                    </li>
                    {
                        Object.keys(auth).length === 0  
                        ? 
                        <li className="nav-item">
                        <Link href="/signin">
                            <a className={"nav-link" + isActive('/signin')} ><i className="fas fa-sign-in-alt" aria-hidden="true" ></i>  Sign In</a>
                        </Link>
                        
                        </li>
                        : loggedRouter()
                    }

                    
                
                
                </ul>
            </div>
                {/* </div> */}
            </div>
            
            {
                cart.length > 0 ? <BasketBug /> 
                : <></>
            }
        </nav>
    )
}

export default NavBar
