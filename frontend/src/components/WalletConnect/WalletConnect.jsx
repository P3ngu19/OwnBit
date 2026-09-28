import { useState } from "react";
import {
  connectWallet,
  getOwnBitTokenBalance,
} from "../../services/walletService";

import "./WalletConnect.css";

function WalletConnect() {
  const [wallet, setWallet] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    try {
      setError("");

      const walletData = await connectWallet();
      setWallet(walletData);

      const balance = await getOwnBitTokenBalance();
      setTokenBalance(balance);
    } catch (err) {
      console.error("Wallet connection error:", err);

      setError(
        err?.message || "Failed to connect MetaMask."
      );
    }
  };

  return (
    <div className="wallet-connect">
      {!wallet ? (
        <button
          className="connect-wallet-btn"
          onClick={handleConnect}
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="wallet-connected">
          <p>
            <strong>Wallet:</strong>{" "}
            {wallet.address.slice(0, 6)}...
            {wallet.address.slice(-4)}
          </p>

          <p>
            <strong>ETH:</strong> {wallet.balance}
          </p>

          <p>
            <strong>OBT:</strong> {tokenBalance}
          </p>

          <p>
            <strong>Chain ID:</strong> {wallet.chainId}
          </p>
        </div>
      )}

      {error && (
        <p className="wallet-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default WalletConnect;