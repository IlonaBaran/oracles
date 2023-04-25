module.exports = {
  input: ['./src/components/*.vue', './src/App.vue'],
  output: './docs',
  componentsRoot: 'src',
  webpackConfig: './node_modules/@vue/cli-service/webpack.config.js',
  sections: [
    {
      name: 'Components',
      components: './src/components/*.vue',
    },
  ],
  propsParser: require('vue-docgen-api').parseProps,
};