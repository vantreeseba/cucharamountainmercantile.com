const { execSync } = require('child_process');
const eleventyPluginFilesMinifier = require('@sherby/eleventy-plugin-files-minifier');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const pluginIcons = require('eleventy-plugin-icons');

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    showAllHosts: true,
  });

  // lazyImages and Files Minifier
  eleventyConfig.addPlugin(lazyImagesPlugin, {
    appendInitScript: false, // Menonaktifkan penyertaan otomatis script lazysizes dari CDN
  });
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
  eleventyConfig.addPlugin(pluginIcons, {
    sources: [{ name: 'lucide', path: 'node_modules/lucide-static/icons' }],
  });

  // Tailwind config target watch
  eleventyConfig.addWatchTarget('tailwind.config.js');

  // Bypass dir
  const passthroughCopies = ['src/robots.txt', 'src/asset/', 'src/CNAME'];
  passthroughCopies.forEach((path) => eleventyConfig.addPassthroughCopy(path));

  // Input output dir
  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'docs',
    },
  };
};
