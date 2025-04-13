import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { DataProvider } from '../store/GlobalState'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    // When component is mounted, subscribe to router changes and log page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // if component is unmounted unsubscribe from event with off method
    return() =>{
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  
  return (
    <DataProvider>
    
      <Layout>
        <Component {...pageProps} />
       
      </Layout>
    </DataProvider>
  )
}

export default MyApp
