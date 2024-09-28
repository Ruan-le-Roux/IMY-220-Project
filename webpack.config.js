const path = require("path");

module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve("frontend/public"),
        filename: "bundle.js",
        publicPath: '/'
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: 'frontend/public'
                        }
                    }
                ]
            }
        ]
    }
};



