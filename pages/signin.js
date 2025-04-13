/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import {useRouter} from 'next/router'

function Signin() {
    const initialState = { email: '', password: '' }
    const [ userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const {state, dispatch} = useContext(DataContext)
    const { auth } = state
    const router = useRouter()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        dispatch({ type: 'NOTIFY', payload: {loading: true} })

        const res = await postData('auth/login', userData)

        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

        dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

        dispatch({ type: 'AUTH', payload: {
            token: res.access_token,
            user: res.user
        }})

        Cookie.set('refreshtoken', res.refresh_token, {
            path:'api/auth/accessToken',
            expires: 7
        })

        localStorage.setItem('firstLogin', true)

    }

    useEffect(() => {
        if(Object.keys(auth).length !== 0) 
        router.push("/profile")
        
    }, [auth])

    return (
        <div>
            <Head>
                <title>Sign-In Page</title>
            </Head>
            <div className='container'>
            <h2 className='xs-12 text-center mt-2'>Sign In</h2>

                <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" id="loginEmail" 
                            aria-describedby="emailHelp" name="email" 
                            value={email} 
                            onChange={handleChangeInput} 

                        />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="loginPassword" name="password" value={password} onChange={handleChangeInput} />
                    </div>
                    
                    <button type="submit" className="btn btn-dark w-100">Sign In</button>
                    
                    <p className="my-2">Would you like to create an account? <Link href="/register"><a style={{color: 'crimson'}}> Register Now</a></Link></p>
                    <p className='my-2 py-2 text-center'><Link href="/passwordHelp" ><a style={{color: 'crimson'}}>Password Help/Reset</a></Link></p>
                    </form>
            </div>
        </div>
    )
}

export default Signin
