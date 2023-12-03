import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";
import Head from "next/head";
import Maintenance from "../components/maintenance"

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
    <Maintenance>
     <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>Rzeno</title>
    </Head>
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
          onClick={() => router.push("/")}
        >
          {/* Staking an NFT */}
          <Image src="/icons/stake.png" alt="token" width={64} height={64} />
          <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
          <p className={styles.selectBoxDescription}>
            Stake your bag of <b>Rzeno NFTs</b>{" "}
            and earn the reward in <b>$RZO</b>.
          </p>
        </div>

        <div className={styles.optionSelectBox}>
          {/* Info about $RZO Token */}
          <p className={styles.selectBoxDescription}>
           INFO: Rzeno token ($RZO) is used as a reward currency for our platform. The holder of Rzeno token ($RZO) used this tokens to participate in different campaign on platfrom like in Raffles and fortune wheel also they can purchase higher trait nfts.We adding more rewards options on our platform, currently this token is not used for trading on any Dex/Cex always check our verified channelS or site (&quot;https://rzeno.com&quot;) for any announcement about $Rzeno Token.  <br/> <br/>Staking Contract: Staking contract is build with Thirdweb ERC721 staking contract, security Audit done by Macro (&quot;https://0xmacro.com&quot;).User get reward from this contract till they keep staked there nft in this smart contract, there is no lock option so user can unstake there nfts anytime and claim there rewards.
          </p>
        </div>
      </div>
    </div>
    </Maintenance>
    </>

  );
};

export default Home;
