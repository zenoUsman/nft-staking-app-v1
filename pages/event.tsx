import { ConnectWallet, useContract, useAddress, useContractRead, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import type{ NextPage } from "next";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/NavBar";


const event: NextPage = () => {
  const address = useAddress()
  const {contract,} = useContract("0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C");
  
  const [accumulatedTokens, setAccumulatedTokens] = useState<number | undefined>(undefined);
  const [earnedTokens, setEarnedTokens] = useState<number | undefined>(undefined);


   
    const fetchAccumulatedTokens = async () => {
      try {
        if (contract && address) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract("0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C", ["function getAccumulatedTokens() view returns (uint256)"], signer);
          // Fetch earnedTokens
          const accumulatedTokensValue = await contract.getAccumulatedTokens();
          
          // Convert wei to tokens (assuming 18 decimal places)
          const tokensValue: number = parseFloat(ethers.utils.formatUnits(accumulatedTokensValue, 18));

          // Set the earned tokens value
          setAccumulatedTokens(tokensValue);
        } else {
          // Set to 0 when the wallet is disconnected
          setAccumulatedTokens(0);
        }
      } catch (error) {
        console.error("Error fetching earned tokens:", error);
      }
    };


  

  
  const fetchEarnedTokens = async () => {
    try {
      if (contract && address) {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract("0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C", ["function earnedTokens() view returns (uint256)"], signer);
        // Fetch earnedTokens
        const earnedTokensValue = await contract.earnedTokens();
        // Convert wei to tokens (assuming 18 decimal places)
        const tokensValue: number = parseFloat(ethers.utils.formatUnits(earnedTokensValue, 18));
        // Set the earned tokens value
        setEarnedTokens(tokensValue);
      } else {
        // Reset to undefined when the wallet is disconnected
        setEarnedTokens(0);
      }
    } catch (error) {
      console.error("Error fetching earned tokens:", error);
    }
  };


  useEffect(() => {
    // Fetch accumulated tokens when the component mounts or when the address changes
    fetchAccumulatedTokens();
  }, [contract, address]);

  useEffect(() => {
    // Fetch earned tokens when the component mounts or when the address changes
    fetchEarnedTokens();
  }, [contract, address]);

    return(
       <>
       
      <Navbar />
<div className={styles.container}>
  <h1 className={styles.h1}>Rzeno Christmas Reward</h1>
    <br/>
    <div className={styles.tokenGrid}>
    <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Balance:</h3>
                <p className={styles.tokenValue}>
                {earnedTokens === undefined ? 'Loading...' : earnedTokens.toString()} Rzeno
                </p>
              </div>

    <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Reward Claimed:</h3>
                <p className={styles.tokenValue}>
                {accumulatedTokens === undefined ? 'Loading...' : accumulatedTokens.toString()} Rzeno
                </p>
              </div>
              </div>
              <br/>

{/* Claim Reward section */}
<h2>Claim your Reward tokens here</h2>
<Web3Button contractAddress="0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C" action={(contract)=> contract.call("claimTokens")}>
Claim Reward
</Web3Button>
    </div>
    <hr className={`${styles.divider} ${styles.spacerTop}`} />
      </>
    )
};

export default event;