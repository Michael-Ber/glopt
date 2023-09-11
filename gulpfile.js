"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// const dist = "../../../../js/OpenServer/domains/logo";
const dist = "./dist";

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
    return gulp.src("./src/assets/sass/style.scss")
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/assets/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task('imagemin', function() {
  return gulp.src('./src/assets/img/**/*.*')
      .pipe(imagemin())
      // .pipe(gulp.dest('../../../js/OpenServer/domains/serviceManager/assets/img'));
      .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('iconsmin', function() {
  return gulp.src('./src/assets/icons/**/*.*')
      .pipe(imagemin())
      // .pipe(gulp.dest('../../../js/OpenServer/domains/serviceManager/assets/icons'));
      .pipe(gulp.dest('./dist/assets/icons'));
});

gulp.task("watch", () => {
    browsersync.init({
      server: "./dist/",
      port: 4000,
      notify: true
    });
    
    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/js/**/*.js", gulp.parallel("build-js"));
    gulp.watch("./src/assets/sass/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./src/assets/img/**/*.*", gulp.parallel("imagemin"));
    gulp.watch("./src/assets/icons/**/*.*", gulp.parallel("iconsmin"));
});

gulp.task("build", gulp.parallel("copy-html", "build-js", "build-sass"));

gulp.task("prod", () => {
    gulp.src("./src/assets/sass/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(dist));

    return gulp.src("./src/assets/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: { 
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));