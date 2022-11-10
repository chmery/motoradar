import '@/styles/main.scss'
import Layout from "@/components/layout/layout";
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '@/store/AuthContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}
