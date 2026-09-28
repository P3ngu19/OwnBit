import { ethers } from "ethers";

const CONTRACT_ADDRESS =
  "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function issueTokens(address investor, uint256 amount) returns (bool)",
];

export const isMetaMaskInstalled = () => {
  return (
    typeof window !== "undefined" &&
    !!window.ethereum
  );
};

export const connectWallet = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  const provider = new ethers.BrowserProvider(
    window.ethereum
  );

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const network = await provider.getNetwork();
  const balance = await provider.getBalance(address);

  return {
    address,
    balance: ethers.formatEther(balance),
    chainId: network.chainId.toString(),
  };
};

export const getWalletBalance = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  const provider = new ethers.BrowserProvider(
    window.ethereum
  );

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const balance = await provider.getBalance(address);

  return ethers.formatEther(balance);
};

export const getOwnBitTokenBalance = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  const provider = new ethers.BrowserProvider(
    window.ethereum
  );

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  const balance = await contract.balanceOf(address);

  return balance.toString();
};

export const getOwnBitTokenInfo = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  const provider = new ethers.BrowserProvider(
    window.ethereum
  );

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  const [
    name,
    symbol,
    decimals,
    totalSupply,
  ] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
  ]);

  return {
    name,
    symbol,
    decimals: Number(decimals),
    totalSupply: totalSupply.toString(),
  };
};
export const issueOwnBitTokens = async (amount) => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed.");
  }

  const provider = new ethers.BrowserProvider(
    window.ethereum
  );

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  const transaction = await contract.issueTokens(
    address,
    amount
  );

  console.log("Blockchain transaction:", transaction.hash);

  const receipt = await transaction.wait();

  console.log(
    "Blockchain transaction confirmed:",
    receipt.hash
  );

  return {
    hash: receipt.hash,
    address,
    amount: amount.toString(),
  };
};