const path = require('path');
let prod = process.env.NODE_ENV === 'production';

module.exports = {
  eslint: true,
  wpyExt: '.wpy',
  build: {
    web: {
      apis: ['showToast', 'showActionSheet', 'showModal'],
      components: [
        'navigator',
        'button',
        'icon',
        'progress',
        'slider',
        'radio',
        'radio-group',
        'checkbox',
        'checkbox-group',
        'switch'
      ],
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  compilers: {
    less: {},
    babel: {
      sourceMap: true,
      presets: ['es2015', 'stage-1'],
      plugins: ['transform-export-extensions', 'syntax-export-extensions']
    }
  },
  appConfig: {
    baseUrl: prod ? 'https://api.kecoyo.com' : 'http://127.0.0.1:8360'
  }
};

if (prod) {
  delete module.exports.compilers.babel.sourcesMap;

  // 压缩less
  module.exports.compilers['less'] = { compress: true };

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    }
    /* imagemin: {
          filter: /\.(jpg|png|jpge)$/,
          config: {
            jpg: {
              quality: 80
            },
            png: {
              quality: 80
            }
          }
        } */
  };
}
