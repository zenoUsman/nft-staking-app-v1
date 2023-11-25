// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Home.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
    <div className={styles.logo}>
      <Link href="/">
        
          <img src="/icons/logo.png" alt="Logo" width={65} height={65}/>
        
      </Link>
    </div>
    <ul className={styles.navList}>
      <li>
        <Link href="/stake">
          Stake
        </Link>
      </li>
      <li>
        <Link href="/">
          Raffles
        </Link>
      </li>
      <li>
        <Link href="/">
          Fortune Wheel
        </Link>
      </li>
      {/* Add more navigation items as needed */}
    </ul>
  </nav>
  );
};

export default Navbar;
