var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    dist: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'dist/',
        style: 'dist/css/',
        json: 'dist/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html',
        style: 'src/css/reset.css',
        json: 'src/timetable.json'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/*.html',
        style: 'src/css/*.css',
        json: 'src/timetable.json'
    },
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "bigtony555"
};

gulp.task('html:dist', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.dist.html)) //Выплюнем их в папку dist
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});



gulp.task('style:dist', function () {
    gulp.src(path.src.style) //Выберем наш reset.css
        .pipe(gulp.dest(path.dist.style)) //И в dist
        .pipe(reload({stream: true}));
});


gulp.task('json:dist', function () {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.dist.json))
        .pipe(reload({stream: true}));
});


gulp.task('dist', [
    'html:dist',
    'style:dist',
    'json:dist'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:dist');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:dist');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('json:dist');
    });
});


gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('default', ['dist', 'webserver', 'watch']);