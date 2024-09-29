/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false,
        encoding: false,
        // Add other modules to ignore if necessary
      };
      return config;
    },
  };
  
  export default nextConfig;
  