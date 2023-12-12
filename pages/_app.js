// add bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// own css files
import '@/styles/globals.css'

import Nav from '@/components/Nav'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  })
  
  return (
    <>
      <Nav />
      <Component {...pageProps} />    
    </>
  )
}