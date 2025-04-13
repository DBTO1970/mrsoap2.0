/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect} from 'react'
import { DataContext } from '../store/GlobalState'

import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'
import { ImageUpload } from '../utils/imageUpload'


const Profile = ()=> {
    const initialState = {
        avatar: '',
        name: '',
        password: '',
        cf_password: ''

    }
    const [data, setData] = useState(initialState)
    const { avatar, name, password, cf_password} = data


    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state

    useEffect(() => {
        if(auth.user) setData({...data, name: auth.user.name })
    }, [auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]: value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUpdateProfile = e => {
        e.preventDefault()
        if(password) {
            const errMsg = valid(name, auth.user.email, password, cf_password)
            if(errMsg) return dispatch({type: 'NOTIFY', payload: {error: errMsg}})
            updatePassword()

        } 
        if(name !== auth.user.name || avatar) updateInfor()
    }

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: "NOTIFY", payload: {error: res.err} })
            return dispatch({ type: "NOTIFY", payload: {success: res.msg} })
        })

    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if(!file) 
            {return dispatch({type: 'NOTIFY', payload:{ error: 'File does not exist.'}})}

        if(file.size > 1024 * 1024) // 1mb file size limit 
           { return dispatch({type: 'NOTIFY', payload:{ error: 'Image size limit is 1mb.'}})}

        if(file.type !== "image/jpeg" && file.type !== "image/png")  
           { return dispatch({type: 'NOTIFY', payload:{ error: 'File format is incorrect.'}})}
        
        setData({...data, avatar: file})

    }

    const updateInfor = async () => {
        let media;
        dispatch({type: 'NOTIFY', payload: {loading: true}})

        if(avatar) media = await ImageUpload([avatar])

        patchData('user', {
            name, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: { error: res.err}})

            dispatch({type: "AUTH", payload: {
                token: auth.token,
                user: res.user
            }})
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })

    }

    if(!auth.user) return null;

    return(
        <div className='profile_page container' >
            <Head>
                <title>Profile</title>
            </Head>
            <div className=''>
            <section className='row text-secondary my-3'>
                <div className='col-md-4'>
                    <h3 className='text-center text-uppercase' >
                        {auth.user.role === 'user' ? 'User Profile' : 'Admin Profile'}
                    </h3>
                        
                    <div className='avatar'>
                        <img 
                            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                            alt="avatar" aria-hidden="true" />
                        <span className='avatar-update'>
                            <i className='fas fa-camera' aria-hidden="true" ></i>
                            <p>Change</p>
                            <input 
                                type="file" 
                                name="file" 
                                id="file_up" 
                                accept='image/*'
                                onChange={changeAvatar}
                            />
                            
                        </span>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            className="form-control" 
                            placeholder="Your name" 
                            onChange={handleChange} />
                        
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            defaultValue={auth.user.email} 
                            className="form-control" 
                            placeholder="Your email" 
                            disabled={true} 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>New Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            defaultValue={password} 
                            className="form-control" 
                            placeholder="Your new password" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='cf_password'>Confirm Password</label>
                        <input 
                            type="password" 
                            name="cf_password" 
                            defaultValue={cf_password} 
                            className="form-control" 
                            placeholder="Confirm new password" 
                            onChange={handleChange} 
                        />
                    </div>
                    <button 
                        className="btn btn-info" 
                        disabled={notify.loading} 
                        onClick={handleUpdateProfile}>
                        Update
                    </button>
                </div>
                <div className='col-md-8 mt-4'>
                    <h3 className='text-uppercase'>Orders</h3>
                    <div className='my-3 table-responsive'>
                        <table className='table-bordered table-hover w-100 text-uppercase' >
                            <thead className='bg-light font-weight-bold text-center'>
                                <tr>
                                    <td className='p-2 small'>id</td>
                                    <td className='p-2 small'>date</td>
                                    <td className='p-2 small'>total</td>
                                    <td className='p-2 small'>sent</td>
                                    <td className='p-2 small'>paid</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => (
                                        
                                        <tr key={order._id} className='text-center'>
                                            <td className='p-2 small' style={{wordWrap: "break-word", maxWidth:"50px", cursor:"pointer"}} >
                                                <Link href={`/order/${order._id}`} >
                                                    <a>{order._id}</a>
                                                </Link>
                                                
                                            </td>
                                            <td className='p-2 small' style={{wordWrap: "break-word", maxWidth:"50px"}} >
                                                {new Date(order.createdAt).toLocaleDateString({style: 'year', year:'2-digit'})}
                                            </td>
                                            <td className='p-2 small' style={{wordWrap: "break-word", maxWidth:"50px"}} >
                                                {order.total.toLocaleString('en-us', {style: 'currency', currency: 'USD'})}
                                            </td>
                                            <td className='p-2 small' style={{wordWrap: "break-word", maxWidth:"50px"}} >
                                                {
                                                        order.shipped 
                                                        ? <i className='fas fa-check text-success' aria-hidden="true" ></i>
                                                        : <i className='fas fa-times text-danger' aria-hidden="true" ></i>
                                                }
                                            </td>
                                            <td className='p-2' style={{wordWrap: "break-word", maxWidth:"50px"}} >
                                                
                                                        {
                                                            order.paid 
                                                            ? <i className='fas fa-check text-success' aria-hidden="true" ></i>
                                                            : <i className='fas fa-times text-danger' aria-hidden="true" ></i>
                                                        }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </section>
            </div>
        </div>
        
    )
}

export default Profile