/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:["spruko.com","i.pravatar.cc","d18ecvyudwyhaj.cloudfront.net"],
        unoptimized: true,
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig
