/* eslint-env node */
const path = require("path");

const config = {
    entry: ["./src/js/app.js"],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js?$/,
            loader: "babel-loader"
        }]
    }
};

module.exports = config;