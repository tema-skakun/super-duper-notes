import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.title} href="/" passHref>
        Notes App
      </Link>
      <nav className={styles.nav}>
        <Link href="/" passHref>
          Home
        </Link>
        <Link href="/search" passHref>
          Search
        </Link>
        <Link href="/about" passHref>
          About
        </Link>
      </nav>
    </header>
  );
}
