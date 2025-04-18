/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import {useRouter} from 'next/router'


const Register = () => {
    const initialState = { name: '', email: '', password: '', cf_password: '' }
    const [ userData, setUserData] = useState(initialState)
    const { name, email, password, cf_password} = userData

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
        const errMsg = valid(name, email, password, cf_password)
        if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

        dispatch({ type: 'NOTIFY', payload: {loading: true} })

        const res = await postData('auth/register', userData)

        if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
        
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg} }, router.push("/signin"))



    }

    useEffect(() => {
        if(Object.keys(auth).length !== 0) 
        router.push("/")
        
    }, [auth])

    return(
        <div>
            <Head>
                <title>Registration Page</title>
            </Head>
            <div className='container' >
            <h2 className='xs-12 text-center mt-2'>Register</h2>

             <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
                <div className='form-group'>
                <label htmlFor="exampleInputPassword1">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        placeholder="What's your name?" 
                        value={name} 
                        onChange={handleChangeInput}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                    name="email" 
                    value={email} 
                    onChange={handleChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Must be 6-10 alphanumeric and special characters" 
                    name="password" 
                    value={password} 
                    onChange={handleChangeInput}
                    />
                    <br />
                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="cf_password" placeholder="Re-enter Password" 
                    name="cf_password" 
                    value={cf_password} 
                    onChange={handleChangeInput}
                    />
                </div>
                
                <button type="submit" className="btn btn-dark w-100">Register</button>
                <p className="my-2">Already have an account? <Link href="/signin"><a style={{color: 'crimson'}}> Sign In</a></Link></p>
                </form>
        </div>
        </div>
    )
}

export default Register