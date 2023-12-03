import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import Checkbox from "../components/Checkbox";  // Import Checkbox component
import {
  nftDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
} from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";
import DotPreloader from "../components/preloader";

const Stake: NextPage = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract, isLoading } = useContract(stakingContractAddress);
  const { data: ownedNfts, error} = useOwnedNFTs(nftDropContract, address);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);
  console.log(ownedNfts)

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, contract]);


  const handleWithdrawAllClick = async () => {
    if (!address || !stakedTokens || !contract) return;

    const stakedNftIds = stakedTokens[0];

    if (stakedNftIds.length > 0) {
      await contract?.call("withdraw", [stakedNftIds]);
    }
  };

  async function handleButtonClick(){
    if (!address || !ownedNfts || !contract) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }

    const unstakedNfts = ownedNfts.filter(
      (nft) => !stakedTokens?.[0]?.includes(nft.metadata.id)
    );

    const nftIds = unstakedNfts.map((nft) => nft.metadata.id);
    if (nftIds.length > 0) {
      await contract?.call("stake", [nftIds]);
    }
  }


  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [[id]]);
  }
  
  if (isLoading) {
    return <div><DotPreloader/></div>;
  }
}

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.h1}>Stake Your NFTs here</h1>
        <p>Each staked Rzeno Nft will earn 10 $RZO Per day.</p>

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        {!address ? (
          <ConnectWallet />
        ) : (
          <>
            <ConnectWallet />
            <h2>Your Tokens</h2>
            <div className={styles.tokenGrid}>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                <p className={styles.tokenValue}>
                  <b>
                    {!claimableRewards
                      ? "Loading..."
                      : ethers.utils.formatUnits(claimableRewards, 18)}
                  </b>{" "}
                  {tokenBalance?.symbol}
                </p>
              </div>
              <div className={styles.tokenItem}>
                <h3 className={styles.tokenLabel}>Current Balance</h3>
                <p className={styles.tokenValue}>
                  <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                </p>
              </div>
            </div>
            <Web3Button
              action={(contract) => contract.call("claimRewards")}
              contractAddress={stakingContractAddress}
            >
              Claim Rewards
            </Web3Button>

            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h2>Your Staked NFTs</h2>
            <Web3Button
        contractAddress={stakingContractAddress}
        action={handleWithdrawAllClick}
      >
        Unstake all
      </Web3Button>
            <div className={styles.nftBoxGrid}>
              {stakedTokens &&
                stakedTokens[0]?.map((stakedToken: BigNumber) => (
                  <NFTCard
                    tokenId={stakedToken.toNumber()}
                    key={stakedToken.toString()}
                  />
                ))}
            </div>

            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h2>Your Unstaked NFTs</h2>
            <Web3Button contractAddress={stakingContractAddress} action={handleButtonClick} 
            >
           Stake all
            </Web3Button>
            <div className={styles.nftBoxGrid}>
              {ownedNfts && ownedNfts.length > 0 && ownedNfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.NftMedia}
                  />
                  <h3>{nft.metadata.name}</h3>

                  <Web3Button
                    contractAddress={stakingContractAddress}
                    action={() => stakeNft(nft.metadata.id)}
                  >
                    Stake
                  </Web3Button>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
     }
  );
};


export default Stake;