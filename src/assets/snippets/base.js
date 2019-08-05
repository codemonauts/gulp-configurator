export default {
    packages:
        {
            dependencies: ['gulp@4.0.0', 'gulp-load-plugins', 'minimist', 'del'],
            development: ['glob-watcher', 'fancy-log', 'beeper', 'gulp-plumber'],
        },
    tasks: `gulp.task('clean', function() {
log('Clean destination directories.')
return del([
    /* add directories here */
], {
    force: true
});
});

gulp.task('build', gulp.parallel(/* add tasks here */), () => {});
gulp.task('watch', gulp.series(gulp.parallel(/* add tasks here */), function watch () {
    log('Start watching...');
}));

gulp.task('default', gulp.series('clean', 'watch'), function() {
    log('Start build for '+env);
});`,
    base: `var gulp = require('gulp');
var log = require('fancy-log');
var $ = require('gulp-load-plugins')();
var watcher = require('glob-watcher');

var del = require('del');

var env = require('minimist')(process.argv.slice(2))._[0] || 'development';

function onError(err) {
    require('beeper')();
    log.error(err);
}
var isDevelopment = function() {
    return (env === 'development');
};
var isProduction = function () {
    return !isDevelopment();
};`
}