// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Home.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        
        <Link href="/">
        <Image src='/icons/logo.png' alt='no image' width={65} height={65}/>
        </Link>
  
      </div>
    </nav>
  );
};

export default Navbar;
