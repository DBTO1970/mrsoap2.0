import { useState } from 'react'

import { patchData } from '../utils/fetchData'
import Head from 'next/head'
import { useRouter } from 'next/router'


function PasswordHelp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const message = 'Please reset password for this account.'
    const router = useRouter()

    // const validator= () => new SimpleReactValidator()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name, 
            email, 
            message
        }

        fetch('/api/passwordHelp/passwordHelp', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        
        router.push('/pwThankYou')

    }
 
    return (
        <div className='container' >
        <Head>
            <title>Password Assistance</title>
        </Head>
            <h2 className='text-center'>Password Assistance</h2>

                <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            placeholder="You Name" 
                            onChange={e => setName(e.target.value)} 
                            required 
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="name@example.com" 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            />
                    </div>
                
                
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-info text-light">Submit</button>
                </div>
            </form>
        </div>
        
    )
}

export default PasswordHelp
