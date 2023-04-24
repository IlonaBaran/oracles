module.exports = {
    input: './src/components/*.vue',
    output: './docs',
    componentsRoot: 'src/components',
    webpackConfig: './node_modules/@vue/cli-service/webpack.config.js',
    sections: [
      {
        name: 'Components',
        components: './src/components/*.vue',
      },
    ],
    propsParser: require('vue-docgen-api').parseProps,
  };