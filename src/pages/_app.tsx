import '@/styles/main.scss'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '@/store/AuthContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
