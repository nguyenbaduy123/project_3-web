import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { store } from '../store'
const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // @ts-ignore
    window.__reduxStore__ = store
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
