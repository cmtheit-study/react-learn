const {defineConfig} = require("vite");

module.exports = defineConfig({
  resolve: {
    alias: {
      "@": "./src"
    }
  }
})