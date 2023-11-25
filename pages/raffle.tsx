import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";
import { NextPage } from "next";

const Raffle:NextPage = () =>{
const router = useRouter();
return (
<>
<Navbar/>
<div className={styles.container}>
<h1 className={styles.h1}>Welcome to Raffle DoJo!</h1>
<h1 className={styles.h1}>Coming soon!</h1>
<div className={styles.optionSelectBox}>
          {/* Info about Raffle system */}
          <p className={styles.selectBoxDescription}>
           <br/> 
           Each $Rzeno tokens holder can participate in Raffle which will be host in daily or weekly basis so there will be mutiple rewards like NFTs from other collections, physcial art, hoodies and much more the only way to get participate is owning $Rzeno token.  
          </p>
        </div>
        </div>
</>
);
};

export default Raffle;