import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: '20px',
        lineHeight: '1.5',
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
