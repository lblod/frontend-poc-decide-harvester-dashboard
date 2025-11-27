'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { Webpack } = require('@embroider/webpack');
module.exports = async function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
  });

  const { setConfig } = await import('@warp-drive/build-config');
  setConfig(app, __dirname, {
    deprecations: {
      DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
    },
  });

  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    staticEmberSource: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packagerOptions: {
      webpackConfig: {
        resolve: {
          alias: {
            fetch: require.resolve('cross-fetch'),
          },
          fallback: {
            crypto: false,
            stream: false,
            buffer: false,
          },
        },
        devtool: 'source-map',
      },
    },
  });
};
