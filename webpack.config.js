var path = require('path')
var webpack = require('webpack')
// var UglifyJsPlugin =require('uglifyjs-webpack-plugin')
// const ASSET_PATH = process.env.ASSET_PATH || '/';
module.exports = {
  entry: './src/main.js',//vue直接运行目录
  //entry: './src/components/viewer/index.js',
  //entry: './src/components/index.js',//打包修改目录
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    //publicPath: './',
    //filename:'build.js'
    filename: 'vue-webgl-plugin.js',
    library: 'vue-webgl-plugin',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  // optimization:{
  //   minimize: true,
  //   minimizer:[new UglifyJsPlugin()]
  // },
  // plugins: [
  //   //该插件帮助我们安心地使用环境变量
  //   new webpack.DefinePlugin({
  //     'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
  //   })
  // ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath:'assets'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'static': resolve('static')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}