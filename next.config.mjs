/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // domínio usado para fotos de perfil do Google
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.fna.fbcdn.net', // Subdomínios do Facebook para imagens de perfil
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
