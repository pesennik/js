var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var tsify = require("tsify");
var shim = require("browserify-shim");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task("clean", function () {
    gulp.src('./dist/*.js', {read: false}).pipe(clean());
});

gulp.task("build", ["clean"], function () {
    browserify(["./src/site.ts", "./typings/tsd.d.ts"])
        .plugin(tsify)
        .transform(shim)
        .bundle()
        .pipe(source("site.js"))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("minify", ["build"], function () {
    gulp.src("./dist/site.js")
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("default", ["minify"]);