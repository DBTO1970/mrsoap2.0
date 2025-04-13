import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ThankYou = () => {
    const router = useRouter()
    return(
        <div>
        <Head>
            <title>Contact Thank You</title>
        </Head>
            <div>
                <button className='btn btn-dark' onClick={() => router.push('/') }>
                    <i className='fas fa-arrow-left' aria-hidden="true" ></i> Keep Shopping
                </button>
            </div>
            <div className='pt-4 text-center'>
            <h3>Thank you for contacting Morning Rituals Soap!</h3>
            <p>Someone will respond shortly.</p>
            </div>
           
        </div>
    )
}

export default ThankYou
            