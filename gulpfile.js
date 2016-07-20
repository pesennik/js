var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var tsify = require("tsify");
var shim = require("browserify-shim");

gulp.task("build", function () {
    return browserify(["./src/main.ts", "./typings/tsd.d.ts"])
        .plugin(tsify)
        .transform(shim)
        .bundle()
        .pipe(source("site.js"))
        .pipe(gulp.dest("./package/js/"))
});


gulp.task("build-tests", function () {
    return browserify(["./spec/tests.ts", "./typings/tsd.d.ts"])
        .plugin(tsify)
        .transform(shim)
        .bundle()
        .pipe(source("tests.js"))
        .pipe(gulp.dest("./package/js/"))
});

gulp.task("deploy-site-js", ["build"], function () {
    return gulp.src("./package/js/site.js")
        .pipe(gulp.dest("../pesennik/src/main/webapp/js/"));
});

gulp.task("default", ["build"]);