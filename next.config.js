/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [
      { source: '/load.php', destination: 'https://cpubmed.openi.org.cn/load.php' },
      { source: '/index.php/:path*', destination: 'https://cpubmed.openi.org.cn/index.php/:path*' },
      { source: '/graph/search.php/:path*', destination: 'https://cpubmed.openi.org.cn/graph/search.php/:path*' },
      { source: '/graphQuery', destination: 'https://cpubmed.openi.org.cn/graphQuery' },
      { source: '/graphstatic/:path*', destination: 'https://cpubmed.openi.org.cn/graphstatic/:path*' },
    ]
  }
}

module.exports = nextConfig
