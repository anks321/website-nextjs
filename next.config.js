const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  target: 'serverless',
};

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg'],
        optimizeImagesInDev: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [180, 360, 600, 760, 1000],
        },
      },
    ],
  ],
  nextConfig
);
