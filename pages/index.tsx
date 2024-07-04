import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import { BalanceDisplay } from "../components/BalanceDisplay";
import { MintToForm } from "../components/MintToForm";
import { CreateTokenAccountForm } from "../components/CreateTokenAccount";
import { CreateMintForm } from "../components/CreateMint";
import Head from "next/head";

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>SPL Token Launch Dapp</title>
        <meta name="description" content="Token Program" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div
          style={{
            background: `url("https://images7.alphacoders.com/901/thumb-1920-901328.jpg")`,
            backgroundRepeat:'no-repeat',
            backgroundSize:"cover",
            minHeight: "100%",
            
            height: "fit-content",
          }}
          className={styles.AppBody}
        >
          <div className={styles.AppBody}>
            <BalanceDisplay />
            <CreateMintForm />
            <CreateTokenAccountForm />
            <MintToForm />
          </div>
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
