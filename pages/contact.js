import React, { useState, useContext } from 'react'

//adding auth state to contact form if logged in
import { DataContext } from '../store/GlobalState'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Contact() {
    const { state } = useContext(DataContext)
    const { auth } = state

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name, 
            email, 
            message
        }

        fetch('/api/contact/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        router.push('/thankYou')

    }

    if(!auth.user) return (
        <div className='container' >
        <Head>
            <title>Contact Page</title>
        </Head>
            <h2 className='text-center'>Contact</h2>

                <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            placeholder="Your Name" 
                            onChange={e => setName(e.target.value)} 
                            required 
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="name@example.com" 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            />
                    </div>
                <div className="form-group">
                    <label htmlFor="message"></label>
                    <textarea 
                        className="form-control" 
                        id="message" 
                        rows="3" 
                        
                        placeholder='How can we assist?' 
                        type="text" 
                        onChange={e => setMessage(e.target.value)} 
                        required
                        />
                       
                </div>
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-info text-light" >Submit</button>
                </div>
            </form>
        </div>
    )

    return (
        
        <div className='container' >
        <Head>
            <title>Contact Page</title>
        </Head>
            <h2 className='text-center'>Contact</h2>
                <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        {/* <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            value={auth.user.name}
                            
                            /> */}
                            <p>{auth.user.name}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        {/* <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={auth.user.email}
                            /> */}
                           <p>{auth.user.email}</p>
                    </div>
                <div className="form-group">
                    <label htmlFor="message"></label>
                    <textarea 
                        className="form-control" 
                        id="message" 
                        rows="3" 
                        
                        placeholder='How can we assist?' 
                        type="text" 
                        onChange={e => setMessage(e.target.value)} 
                        required
                        />
                       
                </div>
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-info text-light" >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Contact
