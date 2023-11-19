// components/Navbar.tsx
import Link from 'next/link';
import styles from "../styles/Home.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          My Logo
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
