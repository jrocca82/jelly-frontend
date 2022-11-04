import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { ConnectionContextProvider } from '../contexts/ConnectionContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ConnectionContextProvider>
          <Component {...pageProps} />
      </ConnectionContextProvider>
    </ChakraProvider>
  )
}
