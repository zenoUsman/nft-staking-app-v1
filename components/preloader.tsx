// components/DotPreloader.tsx

import { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css"; // Create a CSS module for styling

const DotPreloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the preloader for a few seconds
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.preloaderContainer}>
        <div className={styles.dotPreloader}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    );
  }

  return null; // Render nothing once loading is complete
};

export default DotPreloader;