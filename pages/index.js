import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import Filter from '../components/Filter'
import BasketBug from '../components/BasketBug'
import CookieConsent from 'react-cookie-consent'


const Home = (props) => {
  const [products, setProducts] = useState(props.products)
  
  const [isChecked, setIsChecked] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const {state, dispatch} = useContext(DataContext)
  const {auth, cart} = state

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  const handleCheck = (id) => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })

    setProducts([...products])
  }

  const handleCheckAll = () => {
    products.forEach(product => product.checked = !isChecked)
    setProducts([...products])
    setIsChecked(!isChecked)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if(product.checked) {
        deleteArr.push({
          data: '', 
          id: product._id, 
          name: 'Delete all selected products?', 
          type: 'DELETE_PRODUCT'
        })
      }
    })
    dispatch({ type: 'ADD_MODAL', payload: deleteArr })
  }

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({router, page: page + 1})

  }

  return(
    <div className="home_page"  style={{fontFamily: 'Balsamiq Sans'}} >
    
      <Head>
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="description of your project" />
        <meta name="theme-color" content="#000" />
        <title>Morning Rituals Soap</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </Head>
      
      <Filter state={state} />
      <div className='container text-center' >
        {
          auth.user && auth.user.role === 'admin' && 
          <div className='delete_all btn btn-danger mt-2' style={{marginBottom: '-10px'}}>
            <input type="checkbox" checked={isChecked} onChange={handleCheckAll} 
              style={{width: '25px', height: '25px', transform: 'translateY(8px)' }} />
            <button className='btn btn-danger ml-2' 
              data-toggle="modal" data-target="#exampleModal" 
              onClick={handleDeleteAll}>
              DELETE ALL
            </button>
          </div>
        }
        {
          auth.user && auth.user.role === 'admin'? 
          <></>
        : <Link href={'/about'} passHref >
            <button className='btn btn-dark my-3' onClick={() => router.push('/about')}><i className="fas fa-soap" aria-hidden="true" ></i> About Morning Rituals </button>
        </Link>
        }

        
        {
          products.length <= 2
          ? <div className='pt-2 text-center'>
              <h5 className='text-danger'>More soap coming soon!</h5>
              <h5><a href="https://www.facebook.com/Morning-Rituals-Soap-107016931918107" target="_blank" rel="noreferrer"><i className="fab fa-facebook px-2" aria-hidden="true" style={{textShadow: "1px 1px 2px gray"}} ></i> Follow on Facebook</a> for Updates!</h5>
            </div>
          : <></>
        }
          
          
      <div className="products text-center" >
          
          {
              products.length === 0 
              ? <h2>No Products</h2>

              : products.map(product => (
                <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
              ))
            }
          </div>
        

          {
            props.result < page * 20 ? ""
            : <button className='btn btn-outline-info d-block mx-auto mb-4 load-more'
                onClick={handleLoadmore} style={{boxShadow:"5px 5px 5px gray"}}>
                Load more
            </button>
          }
        
      </div>
      <BasketBug />
      <CookieConsent 
        acceptOnScroll={true} 
        acceptOnScrollPercentage={50} 
        >
        Please note that this site uses cookies for the function and performance of the application.  
        This data will never be shared.
      </CookieConsent>
      </div>
      
  )
}

export async function getServerSideProps({query}) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${page * 20}&category=${category}&sort=${sort}&name=${search}`
    )

  //server side rendering
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home