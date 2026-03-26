/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nftstorage.link',
                pathname: '/ipfs/**',
            },
        ],
    },
};

export default nextConfig;
