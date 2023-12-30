import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import { ethers } from 'ethers';
import Navbar from '../components/NavBar';
import { useAddress, useContract, Web3Button } from '@thirdweb-dev/react';
import { css } from '@emotion/react';
import { MoonLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Event: NextPage = () => {
  const [walletChanged, setWalletChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const address = useAddress();
  const { contract } = useContract("0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C");

  const [accumulatedTokens, setAccumulatedTokens] = useState<number | undefined>(undefined);
  const [earnedTokens, setEarnedTokens] = useState<number | undefined>(undefined);

  const fetchAccumulatedTokens = async () => {
    try {
      setLoading(true);

      if (contract && address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          "0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C",
          ["function getAccumulatedTokens() view returns (uint256)"],
          signer
        );

        const accumulatedTokensValue = await contractInstance.getAccumulatedTokens();
        const tokensValue: number = accumulatedTokensValue.isZero() ? 0 : parseFloat(ethers.utils.formatUnits(accumulatedTokensValue, 18));

        setAccumulatedTokens(tokensValue);
      } else {
        setAccumulatedTokens(0);
      }
    } catch (error) {
      console.error("Error fetching accumulated tokens:", error);
      const typedError: Error = error as Error;
      toast.error(`Error fetching accumulated tokens: ${typedError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEarnedTokens = async () => {
    try {
      setLoading(true);

      if (contract && address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          "0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C",
          ["function earnedTokens() view returns (uint256)"],
          signer
        );

        const earnedTokensValue = await contractInstance.earnedTokens();
        const tokensValue: number = earnedTokensValue.isZero() ? 0 : parseFloat(ethers.utils.formatUnits(earnedTokensValue, 18));

        setEarnedTokens(tokensValue);
      } else {
        setEarnedTokens(0);
      }
    } catch (error) {
      console.error("Error fetching earned tokens:", error);
      const typedError: Error = error as Error;
      toast.error(`Error fetching earned tokens: ${typedError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimTokens = async () => {
    try {
      setLoading(true);

      if (contract && address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          "0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C",
          ["function claimTokens()"],
          signer
        );

        // Call the claimTokens function on the smart contract
        const transaction = await contractInstance.claimTokens();

        // Wait for the transaction to be mined
        await transaction.wait();

        // Show success notification
        toast.success('Tokens claimed successfully!');
      } else {
        // Show error notification
        toast.error('Error: Unable to claim tokens. Please check your wallet and contract.');
      }
    } catch (error: any) {
      // Explicitly type 'error' as 'any' or 'Error' to resolve the TypeScript error
      const typedError: Error = error as Error;

      // Show error notification
      toast.error(`Error claiming tokens: ${typedError.message}`);
    } finally {
      // Hide loading spinner
      setLoading(false);

      // Refresh token data after claiming
      fetchAccumulatedTokens();
      fetchEarnedTokens();
    }
  };

  useEffect(() => {
    fetchAccumulatedTokens();
  }, [contract, address, walletChanged]);

  useEffect(() => {
    fetchEarnedTokens();
  }, [contract, address, walletChanged]);

  useEffect(() => {
    if (address) {
      setWalletChanged((prev) => !prev);
    }
  }, [address]);

  const handleRefreshClick = () => {
    fetchAccumulatedTokens();
    fetchEarnedTokens();
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.h1}>Rzeno Christmas Reward</h1>
        <br />
        <div className={styles.tokenGrid}>
          <div className={styles.tokenItem}>
            <h3 className={styles.tokenLabel}>Claimable Balance:</h3>
            <p className={styles.tokenValue} onClick={handleRefreshClick}>
              {loading ? (
                <MoonLoader size={15} color={'#ffffff'} />
              ) : (
                `${earnedTokens === undefined ? 'Loading...' : `${earnedTokens.toString()} Rzeno`}`
              )}
            </p>
          </div>

          <div className={styles.tokenItem}>
            <h3 className={styles.tokenLabel}>Reward Claimed:</h3>
            <p className={styles.tokenValue} onClick={handleRefreshClick}>
              {loading ? (
                <MoonLoader size={15} color={'#ffffff'} />
              ) : (
                `${accumulatedTokens === undefined ? 'Loading...' : `${accumulatedTokens.toString()} Rzeno`}`
              )}
            </p>
          </div>
        </div>
        <br />
        {/* Claim Reward section */}
        <h2>Claim your Reward tokens here</h2>
        <Web3Button contractAddress="0xd16144c0EF19eE5382f26dD8FF48D683fa39A87C" action={handleClaimTokens}>
          Claim Reward
        </Web3Button>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <hr className={`${styles.divider} ${styles.spacerTop}`} />
    </>
  );
};

const spinnerStyle = css`
  display: inline-block;
  margin-right: 5px;
`;

export default Event;
