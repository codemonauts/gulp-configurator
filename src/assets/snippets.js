export default {
    tabs: [
        {
            title: 'Base',
            type: 'base',
            packages: {
                dependencies: ['gulp@4.0.0', 'gulp-load-plugins', 'minimist', 'del'],
                development: ['glob-watcher', 'fancy-log', 'beeper', 'gulp-plumber'],
            },
            snippets: ['base', 'task']
        },
        {
            title: 'Templates (pug)',
            type: 'pug',
            packages: {
                dependencies: ['gulp-pug', 'gulp-rename'],
                development: []
            },
            snippets: ['function', 'task', 'watch'],
            directory: '"../templates/**/*"'
        },
        {
            title: 'Styles (sass)',
            type: 'sass',
            packages: {
                dependencies: ['gulp-sass', 'autoprefixer', 'cssnano', 'gulp-postcss'],
                development: ['gulp-sourcemaps']
            },
            snippets: ['import', 'function', 'task', 'watch'],
            directory: '"../public/css/**/*"'
        },
        {
            title: 'JavaScript',
            type: 'js',
            packages: {
                dependencies: ['browserify', 'vinyl-source-stream', 'vinyl-buffer', 'babelify', 'gulp-uglify-es', '@babel/core', '@babel/preset-env'],
                development: ['gulp-sourcemaps']
            },
            snippets: ['import', 'function', 'task', 'watch'],
            directory: '"../public/js/**/*"'
        }
    ]
}