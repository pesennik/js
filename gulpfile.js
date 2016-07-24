var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var tsify = require("tsify");
var shim = require("browserify-shim");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task("build", function () {
    browserify(["./src/main.ts", "./typings/tsd.d.ts"])
        .plugin(tsify)
        .transform(shim)
        .bundle()
        .pipe(source("site.js"))
        .pipe(gulp.dest("./package/"));

    gulp.src("./package/site.js")
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify())
        .pipe(gulp.dest("./package/"));
});


gulp.task("default", ["build"]);