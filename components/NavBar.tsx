// // components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Home.module.css";
import { ConnectWallet } from '@thirdweb-dev/react';

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
        <Link href="/raffle">
          Raffles
        </Link>
      </li>
      <li>
        <Link href="/fortune">
          Wheel
        </Link>
      </li>

      <li>
        <Link href="/event">
         Christmas
        </Link>
      </li>
      <ConnectWallet className={styles.button} 
        modalTitle={"Rzeno"}
        modalSize={"compact"}
        dropdownPosition={{
          side: "bottom", //  "top" | "bottom" | "left" | "right";
          align: "end", // "start" | "center" | "end";
        }}
        modalTitleIconUrl={""}/>
      {/* Add more navigation items as needed */}
    </ul>
  </nav>
  );
};

export default Navbar;