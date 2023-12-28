import { useEffect, useState } from "react";
import { useContract } from "@thirdweb-dev/react";

const useNFTsByAddress = (contractAddress, contractName, userAddress) => {
  const { contract } = useContract(contractAddress, contractName);
  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTsByAddress = async () => {
      try {
        if (contract && userAddress) {
          // Assume there's a function 'balanceOf' in your contract
          const balance = await contract?.call("balanceOf", [userAddress]);

          // Loop through the balance and get individual NFTs
          const nftPromises = [];
          for (let i = 0; i < balance; i++) {
            nftPromises.push(contract?.call("ownerOf", [userAddress, i]));
          }

          // Wait for all promises to resolve
          const nftIds = await Promise.all(nftPromises);
          setNFTs(nftIds);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTsByAddress();
  }, [contract, userAddress]);

  return { nfts, isLoading, error };
};

export default useNFTsByAddress;
