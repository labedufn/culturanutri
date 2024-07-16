/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["https://studious-giggle-j7vpq996g793qw54-8000.app.github.dev/", "localhost:3000"],
    },
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
