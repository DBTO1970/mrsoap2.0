import { useContext } from 'react'
import Link from 'next/link'

import { DataContext } from '../store/GlobalState'

function BasketBug() {
    
    const { state } = useContext(DataContext)
    const { cart } = state
  return (
    <div className="fixed-bottom basket-bug col-1" style={{ opacity: '.8', bottom:'20px', left: '5px'}}>
        <Link href="/cart">
            <a><i className="fas fa-shopping-basket position-relative fa-3x " aria-hidden="true" style={{textShadow: "3px 3px 2px gray"}}>
                <span className='position-absolute' style={{
                    padding: '6px 9px',
                   
                    background: '#ed143dc2',
                    borderRadius: '50%',
                    bottom: '22px',
                    right: '-5px',
                    color: 'white',
                    fontSize: '22px'
                }}>{cart.length}</span>
            </i></a>
        </Link>
    </div>
  )
}

export default BasketBug