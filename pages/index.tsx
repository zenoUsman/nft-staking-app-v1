import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      {/* Top Section */}
      <h1 className={styles.h1}>WELCOME to the RZENO staking DoJo</h1>
      <div className={styles.nftBoxGrid}>
        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push("https://app.komet.me/nfts/Rzeno/402")}
        >
          {/* Mint a new NFT */}
          <Image src="/icons/drop.png" alt="drop" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Mint a new NFT</h2>
          <p className={styles.selectBoxDescription}>
            Mint your Rzeno Nft on komet.
          </p>
        </div>

        <div
          className={styles.optionSelectBox}
          role="button"
          onClick={() => router.push("/stake")}
        >
          {/* Staking an NFT */}
          <Image src="/icons/stake.png" alt="token" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
          <p className={styles.selectBoxDescription}>
            Stake your bag of <b>Rzeno NFTs</b>{" "}
            and earn the reward in <b>$Rzeno</b>.
          </p>
        </div>
      </div>
    </div>
    </>

  );
};

export default Home;
