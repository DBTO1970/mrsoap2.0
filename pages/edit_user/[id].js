import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import {updateItem} from '../../store/Actions'
import { useRouter } from 'next/router'
import { patchData } from '../../utils/fetchData'


const EditUser = () => {
    const router = useRouter()
    const { id } = router.query

    const { state, dispatch } = useContext(DataContext)
    const {auth, users} = state

    const [editUser, setEditUser] = useState([])
    const [checkAdmin, setCheckAdmin] = useState(false)
    const [num, setNum] = useState(0)


    useEffect(()=> {
        users.forEach(user => {
            if(user._id === id) {
                setEditUser(user)
                setCheckAdmin(user.role === 'admin' ? true : false)
            }
        })
    }, [users])

    const handleCheck = () => {
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    // const updatePassword = () => {
    //     dispatch({ type: 'NOTIFY', payload: {loading: true} })
    //     patchData('user/resetPassword', {password}, auth.token)
    //     .then(res => {
    //         if(res.err) return dispatch({ type: "NOTIFY", payload: {error: res.err} })
    //         return dispatch({ type: "NOTIFY", payload: {success: res.msg} })
    //     })

    // }

    // const handleChangeInput = e => {
    //     const {name, value} = e.target
    //     setEditUser({...editUser, [name]:value})
    //     dispatch({ type: 'NOTIFY', payload: {} })
    // }
    
    // const handlePasswordChange = e => {
    //     const {value} = e.target
    //     setPassword({value})
    //     dispatch({ type: 'NOTIFY', payload: {} })
    // }

    const handleSubmit = () => {
        let role = checkAdmin ? 'admin' : 'user'

        if(num % 2 !== 0) {
            dispatch({type: 'NOTIFY', payload: {loading: true}})
            patchData(`/user/${editUser._id}`, {role}, auth.token)
            .then(res => {
                if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

                dispatch(updateItem(users, editUser._id, {
                    ...editUser, role
                }, 'ADD_USERS'))

                return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
            })
        }

        // updatePassword()
        
    }

    return (
        <div className='edit_user my-3'>
            <Head>
                <title>Edit User</title>
            </Head>
            <div>
                <button className='btn btn-dark' onClick={() => router.back()}>
                    <i className='fas fa-arrow-left' aria-hidden></i> Back
                </button>
            </div>
            <div className='col-md-6 mx-auto my-4'>
                <h2 className='text-uppercase text-secondary'>Edit User</h2>
                <div className='form-group'>
                    <label htmlFor='name' className='d-block'>Name </label>
                    <input type="text" id="name" defaultValue={editUser.name} disabled />
                </div>

                <div className='form-group'>
                    <label htmlFor='email' className='d-block'>Email </label>
                    <input type="text" id="email" defaultValue={editUser.email} disabled />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="text" className="form-control" id="password" 
                    name="password" 
                    onChange={handleChangeInput}
                    />
                    
                </div> */}
                <div className='form-group'>
                    <input 
                        type="checkbox" 
                        id="isAdmin" 
                        checked={checkAdmin} 
                        style={{width: '20px', height: '20px'}} 
                        onChange={handleCheck} 
                        />

                    <label htmlFor='isAdmin' style={{transform: 'translate(4px, -3px'}}> isAdmin </label>
                </div>

                <button className='btn btn-dark' onClick={handleSubmit}>Update</button>
            </div>
        </div>
    )
}

export default EditUser