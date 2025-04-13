import Head from 'next/head'
import { useRouter } from 'next/router'

const PWThankYou = () => {
    const router = useRouter()
    return(
        <div>
        <Head>
            <title>Password Assistance Thank You</title>
        </Head>
            <div>
                <button className='btn btn-dark' onClick={() => router.push('/') }>
                    <i className='fas fa-arrow-left' aria-hidden="true" ></i> Keep Shopping
                </button>
            </div>
            <div className='pt-4 text-center'>
            <h5>Thank you for contacting password support</h5>
            <p>Please check your email.  A reset password link will be sent via email within 24 hours.</p>
            </div>
           
        </div>
    )
}

export default PWThankYou
            