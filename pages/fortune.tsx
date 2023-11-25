import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";
import { NextPage } from "next";

const Fortune:NextPage = () =>{
const router = useRouter();
return (
<>
<Navbar/>
<div className={styles.container}>
<h1 className={styles.h1}>Welcome to Fortune Wheel!</h1>
<h1 className={styles.h1}>Coming soon!</h1>
<div className={styles.optionSelectBox}>
          {/* Info about Fortune system */}
          <p className={styles.selectBoxDescription}>
           <br/> 
            Fortune wheel is reward system where user partiipate in different round the wheel consist of different prizes, each round run for 24 to 48 hours in which participants can purchase tickets more you have more chances to get reward.
          </p>
        </div>
        </div>
</>
);
};

export default Fortune;