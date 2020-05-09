/* eslint-env node */
const path = require("path");

const config = {
    mode: "production",
    entry: ["./src/js/app.jsx"],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ["env", "es2015", "react"]
            }
        }]
    }
};

module.exports = config;