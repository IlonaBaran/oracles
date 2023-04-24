module.exports = {
    input: './src/components/*.vue',
    output: './docs',
    componentsRoot: 'src/components',
    webpackConfig: './node_modules/@vue/cli-service/webpack.config.js',
    sections: [
      {
        name: 'Components',
        components: './src/components/*.vue',
        methods: true,
        depth: 1,
      },
    ],
    propsParser: require('vue-docgen-api').parseProps,
  };