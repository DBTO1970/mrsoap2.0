import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

function ForgotPassword() {

    const [email, setEmail] = useState('')
    const router = useRouter()

      const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email
        }

        fetch('/api/passwordHelp/passwordReset', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        
        router.push('/pwThankYou')

    }
 
    return (
        <div className='container' >
        <Head>
            <title>Password Reset</title>
        </Head>
            <h2 className='text-center'>Password Reset</h2>

                <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit} >
                    
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

export default ForgotPassword
