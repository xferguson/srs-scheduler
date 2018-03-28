/* eslint-env node */
const webpackConfig = require("./webpack.config.js");

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            options: {
                configFile: "./eslintrc.json"
            },
            target: ["./Gruntfile.js", "webpack.config.js", "./memrise-srs-calc.js", "./src/js/*.js"]
        },
        webpack: {
            myconfig: webpackConfig
        }
    });

    grunt.registerTask("js", ["eslint", "webpack"]);
    grunt.registerTask("default", ["js"]);
};