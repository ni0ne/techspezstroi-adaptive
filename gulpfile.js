const gulp = require("gulp");
const less = require("gulp-less");
const watch = require("gulp-watch");
const path = require("path");

//сборка less файлов
gulp.task("less", function() {
  return gulp
    .src("./less/**/style.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")]
      })
    )
    .pipe(gulp.dest("./build/css"));
});

gulp.task("watch", function() {
    //endless stream mode
    gulp.watch("./less/**/*.less", gulp.parallel('less'));
})
