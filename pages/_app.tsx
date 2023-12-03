import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";


// This is the chain your dApp will work on.
const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={"50f6bf15676818dbd93e92747a7f6baa"}
    >
      <Component {...pageProps} />
      
    </ThirdwebProvider>
    
  );
}

export default MyApp;