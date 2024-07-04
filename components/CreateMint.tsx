import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { FC, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  createInitializeMintInstruction,
} from "@solana/spl-token";

export const CreateMintForm: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [mint, setMint] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const createMint = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const mint = web3.Keypair.generate();

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new web3.Transaction();

    transaction.add(
      web3.SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mint.publicKey,
        0,
        publicKey,
        publicKey,
        TOKEN_PROGRAM_ID
      )
    );
    try {
      await sendTransaction(transaction, connection, {
        signers: [mint],
      }).then((sig) => {
        setTxSig(sig);
        setMint(mint.publicKey.toString());
      });
    } catch (error) {
      console.log("errror ", error);
    }
  };

  return (
    <div>
      {publicKey ? (
        <form onSubmit={createMint} className={styles.form}>
          <button type="submit" className={styles.formButton}>
            Create Mint
          </button>
        </form>
      ) : (
        <div
          // style={{
          //   paddingTop: "20%",
          // }}
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Please Connect Your Solana Wallet
          </span>
        </div>
      )}
      {txSig ? (
        <div
        style={{
          backgroundColor: "rgba(255, 255, 255,0.5)",
          padding:"20px",
          borderRadius:'20px'
        }}
        >
          <p>Token Mint Address: {mint}</p>
          <p>View your transaction on </p>
          <a
          style={{
            color:"white"
          }}
          href={link()}>Solana Explorer</a>
        </div>
      ) : null}
    </div>
  );
};
