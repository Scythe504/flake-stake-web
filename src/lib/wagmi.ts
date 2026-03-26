import { createConfig, http } from "wagmi";
import { sepolia, baseSepolia } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia, baseSepolia],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(),
      [baseSepolia.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "Flake Staking",

    // Optional App Info
    appDescription: "Next-gen ETH Soulbound Staking",
    appUrl: "https://flake.fi", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, optional
  }),
);
