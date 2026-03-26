# flake-stake-web

Web client for the [Flake Staking Protocol](https://github.com/scythe504/flake-staking-contracts) — stake ETH, receive soulbound receipt tokens, earn $FLAKE rewards, and track on-chain staking reputation.

**Live**: [flake-stake.vercel.app](https://flake-stake.vercel.app)

---

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [wagmi](https://wagmi.sh/) + [viem](https://viem.sh/) — wallet and contract interactions
- [Tailwind CSS](https://tailwindcss.com/) — styling
- Deployed on [Vercel](https://vercel.com/)

Contract ABIs and addresses are colocated in `src/constants/contracts.ts` — no external ABI files needed.

---

## Getting Started

```bash
git clone https://github.com/scythe504/flake-stake-web
cd flake-stake-web
npm install
```

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supported Networks

- Ethereum Sepolia
- Base Sepolia

---

## Contract Addresses

See the [smart contracts repository](https://github.com/scythe504/flake-staking-contracts) for full deployment addresses and protocol documentation.
