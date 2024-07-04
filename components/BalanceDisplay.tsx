import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const BalanceDisplay: FC = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info.lamports);
    });
  }, [connection, publicKey]);

  return publicKey ? (
    <div 
    style={{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      color:"white"
    }}
    >
      <p>{`Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(2)}`}</p>
      <img
        src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/VNKJKO74VFFNTBJF7BP4N4YHWI.png"
        style={{
          height: "25px",
          width: "25px",
          borderRadius: "50%",
          marginLeft: "10px",
        }}
      />
    </div>
  ) : (
    <></>
  );
};
