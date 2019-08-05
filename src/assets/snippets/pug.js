export default {
    packages: ['gulp-pug', 'gulp-rename'],
    function: `function templates(filestream, destination) {
    return filestream
    .pipe($.pug())
    .pipe($.rename({
        extname: ".twig"
    }))
    .pipe(gulp.dest(destination))
}`,
    task: `gulp.task('templates', function() {
    return  functions.templates(gulp.src('pug/**/*.pug'),'../templates');
});`,
    watch: `var pugwatcher = watcher(['pug/**/*.pug']);
pugwatcher.on('change', function(path, stat) {

    if(path.startsWith('pug')) {
        var dir = path.substr(3, path.lastIndexOf('/')-3)
    } else {
        var dir = path.substr(0, path.lastIndexOf('/'))
    }

    functions.templates(gulp.src([path])
                .pipe($.plumber({ errorHandler: onError })), '../templates/'+dir)
        .on('end', function() {
            log('...re-pugged '+ path);
        })
        .pipe($.dockerNotify('Templates copied', path));
});`
}