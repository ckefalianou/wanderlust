const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './dist',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @use "@Theme/main.scss" as *;
        `
      }
    }
  },
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
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
    ],
  },
})
