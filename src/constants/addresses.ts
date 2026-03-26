export const addressConfig = {
  "sepolia": {
    "achievementNft": "0x0aCC39977CD78129a77a209bf9B39C5Ee1C4a68F",
    "flakeToken": "0x6c6e775F1FF9C26B063beD050D45BF7ac424e533",
    "flakeEth": "0x1C13Cd67dBEb01C24ded06322131cc5a83d9CA5E",
    "proxyAddr": "0xf774f60C1418576f2FF1E92dF6a01910b336702d"
  },
  "base": {
    "achievementNft": "0x0aCC39977CD78129a77a209bf9B39C5Ee1C4a68F",
    "flakeToken": "0x6c6e775F1FF9C26B063beD050D45BF7ac424e533",
    "flakeEth": "0x1C13Cd67dBEb01C24ded06322131cc5a83d9CA5E",
    "proxyAddr": "0xf774f60C1418576f2FF1E92dF6a01910b336702d"
  }
} as const;


export type addressConfigType = typeof addressConfig;