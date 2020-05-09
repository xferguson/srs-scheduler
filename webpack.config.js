/* eslint-env node */
const path = require("path");

const config = {
    mode: "production",
    entry: ["./src/js/app.jsx"],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "bundle.js",
        chunkFilename: "vendors.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ["env", "react"]
            }
        }]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    performance: {
        hints: false
    }
};

module.exports = config;