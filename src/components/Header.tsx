import Link from 'next/link';
import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import styles from './Header.module.css';

export default function Header() {
  const [filter, setFilter] = useState('');

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        Notes
      </Link>
    </header>
  );
}
