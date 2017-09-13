import path from 'path';
import webpack from 'webpack';

export default {
    entry: './src/components/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
    loaders: [
       { test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader' },
    ]
  },
}
