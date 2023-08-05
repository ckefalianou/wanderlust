const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
        alias: {
            '@Components': path.resolve(__dirname, 'src/components/'),
            '@Assets': path.resolve(__dirname, 'src/assets/'),
            '@Pages': path.resolve(__dirname, 'src/pages/'),
            '@Layout': path.resolve(__dirname, 'src/components/layout/'),
            '@UI': path.resolve(__dirname, 'src/components/ui/'),  
            '@Theme': path.resolve(__dirname, 'src/theme/'),  
            '@Helpers': path.resolve(__dirname, 'src/helpers/'),  
            '@Store': path.resolve(__dirname, 'src/store/'),  
        }
    },
  },
})
