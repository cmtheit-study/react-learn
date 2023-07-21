const {defineConfig} = require("vite");

module.exports = defineConfig({
  resolve: {
    alias: {
      "@": "./src"
    }
  },
  base: "https://cmtheit-study.github.io/react-learn/react-projects/my_voting_app/dist",
  build: {
    assetsDir: "./assets"
  }
});
