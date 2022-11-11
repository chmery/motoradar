import { ReactNode } from 'react'
import Footer from './footer/footer'
import Header from './header/header'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
