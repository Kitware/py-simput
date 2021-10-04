const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, './simput/pywebvue/modules/SimPut/serve'),
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
  transpileDependencies: [],
};
