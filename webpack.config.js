module.exports = {
    entry: ['whatwg-fetch', './js/app.jsx'],
    devServer:{
      inline: true,
      contentBase: './',
      port: 8080
    },
    output: {
        filename: "js/out.js"
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:  {
                presets: ['es2015','stage-2', 'react']
            }
        }]
    }
}
