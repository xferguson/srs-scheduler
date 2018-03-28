/* eslint-env node */
module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            options: {
                configFile: './eslintrc.json',
            },
            target: ["./Gruntfile.js", "./memrise-srs-calc.js"]
        },
    });

    grunt.registerTask("js", ["eslint"]);
    grunt.registerTask("default", ["js"]);
};