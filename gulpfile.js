"use strict";
/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
const path = {
  build: {
    js: "./build/js/",
    css: "./build/css",
    img: "./build/img/",
    fonts: "./build/fonts/",
    vendor: "./build/vendor/",
    html: "./build/"
  },
  src: {
    js: "./src/js/main.js",
    style: "./src/less/main.less",
    img: "./src/img/**/*.*",
    fonts: "./src/fonts/**/*.*",
    vendor: "./src/vendor/**/*.*",
    html: "./src/html/*.html"
  },
  watch: {
    js: "./src/js/**/*.js",
    css: "./src/less/**/*.less",
    img: "./src/img/**/*.*",
    fonts: "./src/fonts/**/*.*",
    html: "./src/html/**/*.html"
  },
  clean: ".build/*"
};
const gulp = require('gulp'), // подключаем Gulp
  browserSync = require('browser-sync'), // сервер для работы и автоматического обновления страниц
  plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
  rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
  sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
  less = require('gulp-less'), // модуль для компиляции Less в CSS
  autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
  cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
  uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
  cache = require('gulp-cache'), // модуль для кэширования
  imagemin = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
  jpegrecompress = require('imagemin-jpeg-recompress'), // плагин для сжатия jpeg  
  pngquant = require('imagemin-pngquant'), // плагин для сжатия png
  rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов
  rename = require('gulp-rename'), // плагин для переименования файлов
  postCSS = require('gulp-postcss'), // постссс плагин
  mqpacker = require('css-mqpacker'), // сортировка медиазпросов
  sortCSSmq = require('sort-css-media-queries'); // правила сортировки медиазапросов
/* задачи */

// запуск сервера

// сбор стилей
gulp.task('css:build', function (done) {
  return gulp.src(path.src.style) // получим main.scss
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(sourcemaps.init()) // инициализируем sourcemap
    .pipe(less()) // less -> css
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(postCSS([
      mqpacker({
        sort: sortCSSmq
      })
    ]))
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS()) // минимизируем CSS
    .pipe(sourcemaps.write('./')) // записываем sourcemap
    .pipe(gulp.dest(path.build.css)) // выгружаем в build
    .pipe(browserSync.reload({
      stream: true
    })); // перезагрузим сервер
  done();
});

gulp.task('html:build', function () {
  return gulp.src(path.src.html) // выбор всех html файлов по указанному пути
    .pipe(plumber()) // отслеживание ошибок
    .pipe(rigger()) // импорт вложений
    .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
    .pipe(browserSync.reload({ stream: true })); // перезагрузка сервера
});



// сбор js
gulp.task('js:build', function () {
  return gulp.src(path.src.js) // получим файл main.js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указанные файлы в main.js
    .pipe(gulp.dest(path.build.js))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.init()) //инициализируем sourcemap
    .pipe(uglify()) // минимизируем js
    .pipe(sourcemaps.write('./')) //  записываем sourcemap
    .pipe(gulp.dest(path.build.js)) // положим готовый файл
    .pipe(browserSync.stream()); // перезагрузим сервер
});

// перенос шрифтов
gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

// перенос шрифтов
gulp.task('vendor:build', function () {
  return gulp.src(path.src.vendor)
    .pipe(gulp.dest(path.build.vendor));
});

// обработка картинок
gulp.task('image:build', function () {
  return gulp.src(path.src.img) // путь с исходниками картинок
    .pipe(cache(imagemin([ // сжатие изображений
      imagemin.gifsicle({
        interlaced: true
      }),
      jpegrecompress({
        progressive: true,
        max: 90,
        min: 80
      }),
      pngquant(),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ])))
    .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});

// удаление каталога build
gulp.task('clean:build', function () {
  return gulp.src(path.clean, {
    read: false
  })
    .pipe(rimraf());
});

// очистка кэша
gulp.task('cache:clear', function () {
  cache.clearAll();
});

// сборка
gulp.task('build',
  gulp.series('clean:build',
    gulp.parallel(
      'html:build',
      'css:build',
      'js:build',
      'fonts:build',
      'image:build',
      'vendor:build',
    )
  )
);

// запуск задач при изменении файлов
gulp.task('watch', function () {

  browserSync.init({
    server: './build/'
  })

  gulp.watch(path.watch.html, gulp.series('html:build'));
  gulp.watch(path.watch.css, gulp.series('css:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.img, gulp.series('image:build'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
  //gulp.pipe(browserSync.reload({ stream: true }));
});

// задача по умолчанию
gulp.task('default', gulp.series('build', 'watch'));