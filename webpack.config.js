/* eslint-env node */
const path = require("path");

const config = {
    entry: ["./src/js/app.jsx"],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            query: {
                presets: ["env", "react"]
            }
        }]
    }
};

module.exports = config;