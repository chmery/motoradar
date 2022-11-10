import { ReactNode } from "react";
import Header from "./header/header";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header isAuthorized />
            <main>{children}</main>
        </>
    );
};

export default Layout;
