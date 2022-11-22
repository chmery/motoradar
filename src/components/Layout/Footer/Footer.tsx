import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link href='/'>MOTORADAR</Link>
        <span className={styles.authors}>
          Built by <a href='https://github.com/chmery'>chmery</a> and
          <a href='https://github.com/cateruu'> cateruu</a>
        </span>
        <span>Based in Poland</span>
      </div>
    </footer>
  );
};

export default Footer;
