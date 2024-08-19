/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  reactStrictMode: false,
  transpilePackages: ['lodash-es'],
  unstable_allowDynamic: ['/lib/utilities.js', '/node_modules/function-bind/**'],
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { file: /node_modules\/node-fetch\/lib\/index\.js/ },
    ];

    return config;
  },
  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ['matchadiet.com', 'blog.matchadiet.com', 'fasteasy.io', 'web.appscdn.io.', 'matchafit.worldfiles'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web.appscdn.io',
      },
      {
        protocol: 'https',
        hostname: 'matchafit.worldfiles',
      },
      {
        protocol: 'https',
        hostname: '**matchadiet.com',
      },
      {
        protocol: 'https',
        hostname: '**fasteasy.io.io',
      },
      {
        protocol: 'https',
        hostname: '**matchadiet.com',
      },
      {
        protocol: 'https',
        hostname: '**cocofit.yoga',
      },
      {
        protocol: 'https',
        hostname: '**mintdoctor.ir',
      },
      {
        protocol: 'https',
        hostname: '**mint-family.com',
      },
      {
        protocol: 'https',
        hostname: '**mintdoctor.app',
      },
      {
        protocol: 'https',
        hostname: '**mintapp.ir',
      },
      {
        protocol: 'https',
        hostname: '**nikaatmint.ir',
      },
      {
        protocol: 'https',
        hostname: '**ugo-global-immigration-center.com',
      },
      {
        protocol: 'https',
        hostname: '**online-yogini.com',
      },
      {
        protocol: 'https',
        hostname: '**nikaat.com',
      },
      {
        protocol: 'https',
        hostname: '**matchafit.world',
      },
    ],
  },
};

module.exports = nextConfig;
