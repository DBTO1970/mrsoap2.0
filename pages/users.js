/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useContext } from 'react'
import {DataContext} from '../store/GlobalState'
import Link from 'next/link'

const Users = () => {
    const {state, dispatch} = useContext(DataContext)
    const {users, auth, modal} = state

    if(!auth.user) return null;
    return(
        <div className='table-responsive '>
            <Head>
                <titel>Users</titel>
            </Head>
            <h2 className='text-center'>Users</h2>

            <table className='table w-100'>
                <thead>
                    <tr>
                        <td></td>
                        <td>ID</td>
                        <td>Avatar</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Admin</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                                <tr key={user._id}>
                                <th>{index + 1}</th>
                                <th style={{wordWrap: "break-word", maxWidth:"50px", cursor:"pointer"}}  ><Link href={auth.user.root && auth.user.email !== user.email
                                        ? `/edit_user/${user._id}` : "#!"
                                        } passHref >{user._id}</Link>
                                </th>
                                <th>
                                    <img src={user.avatar} alt={user.avatar} 
                                        style={{
                                            width: '30px', 
                                            height: '30px', 
                                            overflow: 'hidden', 
                                            objectFit: 'cover'}}
                                    />
                                </th>
                                <th style={{wordWrap: "break-word", maxWidth:"100px"}} >{user.name}</th>
                                <th style={{wordWrap: "break-word", maxWidth:"100px"}} >{user.email}</th>
                                <th>
                                    {
                                        user.role === 'admin'
                                        ? user.root 
                                            ? <i className='fas fa-check text-success'>  Root</i>
                                            : <i className='fas fa-check text-success'></i>
                                        : <i className='fas fa-times text-danger'></i>
                                    }
                                </th>
                                <th>
                                    <Link href={
                                        auth.user.root && auth.user.email !== user.email
                                        ? `/edit_user/${user._id}` : "#!"
                                        } passHref 
                                        >
                                            <a><i className='fas fa-edit text-info mr-2' title="Edit"  style={{cursor: 'pointer'}} ></i></a>
                                    </Link>

                                    {
                                        auth.user.root && auth.user.email !== user.email
                                        ? <i className='fas fa-trash-alt text-danger ml-2' title="Remove" data-toggle="modal" data-target="#exampleModal" style={{cursor: 'pointer'}} 
                                        onClick={() => dispatch({
                                            type: 'ADD_MODAL',
                                            payload: [{ 
                                                data: users, 
                                                id: user._id, 
                                                name: user.name, 
                                                type: 'ADD_USERS'
                                                }]
                                            })}></i>
                                        : <i className='fas fa-trash-alt text-danger ml-2' title="Remove"></i>
                                    }
                                </th>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users