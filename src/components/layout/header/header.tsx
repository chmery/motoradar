import styles from "./header.module.scss";
import Link from "next/link";

type Props = {
  isAuthorized: boolean
}

const Header = ({ isAuthorized }: Props) => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/">MOTORADAR</Link>
                <div className={styles.links}>
                    {isAuthorized && (
                        <>
                            <Link href="/saved">Saved</Link>
                            <Link href="/dashboard">Dashboard</Link>
                        </>
                    )}
                    <div className={styles.button}>
                        {isAuthorized && <Link href="/new-listing">New Listing</Link>}
                        {!isAuthorized && <Link href="/sign-in">Sign In</Link>}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header
