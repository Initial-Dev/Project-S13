const withTM = require('next-transpile-modules')(['express', 'body-parser', 'cors']);

module.exports = withTM({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.js$/,
      use: [
        options.defaultLoaders.babel,
      ],
      include: [
        __dirname, // or whatever directory you're using
        /node_modules\/(body-parser|cors)/, // any other modules that require transpilation
      ],
    });

    return config;
  },
});
