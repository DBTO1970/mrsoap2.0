/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useState, useContext, useEffect} from 'react'
import { DataContext } from '../../store/GlobalState'
import valid from '../../utils/valid'
import { patchData } from '../../utils/fetchData'

const PasswordReset = ()=> {
    const initialState = {
        
        email: '',
        password: '',
        cf_password: ''

    }
    const [data, setData] = useState(initialState)
    const { email, password, cf_password} = data


    const { state, dispatch } = useContext(DataContext)
    const { auth, notify } = state

    useEffect(() => {
        setData({...data, email: data.email })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]: value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const findUser = (e) => {


    }

    const handleUpdateProfile = e => {
        e.preventDefault()
        if(password) {
            const errMsg = valid(auth.user.email, password, cf_password)
            if(errMsg) return dispatch({type: 'NOTIFY', payload: {error: errMsg}})
            updatePassword()

        } 
        // if(email !== auth.user.email) updateInfor()
        updateInfor()
    }

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: "NOTIFY", payload: {error: res.err} })
            return dispatch({ type: "NOTIFY", payload: {success: res.msg} })
        })

    }


   

    return(
        <div className='profile_page' >
            <Head>
                <title>Reset Password</title>
            </Head>
            <section className='text-secondary my-3'>
                
                <div className='col-md-4'>
                    <h3 className='text-center text-uppercase' >
                        Reset Password
                    </h3>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input 
                                type="text" 
                                name="email" 
                                defaultValue={email} 
                                className="form-control" 
                                placeholder="Your email" 
                                onChange={findUser}
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
                    </form>
                </div>
            </section>
        </div>
        
    )
}

export default PasswordReset
