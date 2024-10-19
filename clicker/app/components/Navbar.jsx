import Link from 'next/link';
import styles from './Navbar.module.css'; // CSS module for styling

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link href="/">Game</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/testimonials">Testimonials</Link></li>
      </ul>
    </nav>
  );
}
