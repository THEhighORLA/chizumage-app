const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');


module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new Dotenv()
    ],
    resolve: {
      fallback:{
        "fs": false,
        "path": false,
        "os": false
      }
    }
  }
})
