import { ReactNode } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
