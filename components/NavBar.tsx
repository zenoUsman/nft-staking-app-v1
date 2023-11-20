// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Home.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
        <Image src='/icons/logo.jpg' alt='no image' width={64} height={64} />
        </Link>
  
      </div>
    </nav>
  );
};

export default Navbar;
