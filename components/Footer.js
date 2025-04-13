import React from 'react'
import Link from 'next/link'
function Footer() {
    return (
        <div className='footer container' >
            
                <div className='text-center row'>
                <hr />
                <div className='col-sm mx-auto px-5' >
                    <a href="https://www.facebook.com/Morning-Rituals-Soap-107016931918107" target="_blank" rel="noreferrer"><i className="fab fa-facebook px-2" aria-hidden="true" style={{textShadow: "1px 1px 2px gray"}} > </i>Like on Facebook</a>
                </div>
                <div className='col-sm mx-auto px-5'>
                    <a href="https://www.instagram.com/morning_rituals_soap/" target="_blank" rel="noreferrer"><i className="fab fa-instagram px-2" aria-hidden="true" style={{textShadow: "1px 1px 2px gray"}} > </i>Follow on Instagram</a>
                </div>
                <div className='col-sm mx-auto px-5'>
                <Link href="/contact">
                        <a><i className="fas fa-envelope px-2" aria-hidden="true" style={{textShadow: "1px 1px 2px gray"}} ></i>Contact</a>
                    </Link>
                </div>
                
                <p className='text-center pt-5' style={{fontSize: '.5rem'}}>&copy; 2023 Morning Rituals Soap</p>
                </div>
        </div>
            
      
    )
}

export default Footer
