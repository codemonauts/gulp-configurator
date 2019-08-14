export default {
    tabs: [
        {
            title: 'Base',
            type: 'base',
            packages: {
                dependencies: ['gulp@4.0.0', 'gulp-load-plugins', 'minimist', 'del'],
                development: ['glob-watcher', 'fancy-log', 'beeper', 'gulp-plumber', 'gulp-docker-notify'],
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
            notes: {
                task: [{
                    line: 2,
                    note: 'destination directory for craft 2: ../craft/templates'
                }],
                watch: [{
                    line: 11,
                    note: 'destination directory for craft 2: ../craft/templates'
                }]
            },
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
            notes: {
                watch: [{
                    line: '3',
                    note: 'if using functions.js call sass-function with functions.sass(...)'
                }]
            },
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
        },
        {
            title: 'Images',
            type: 'img',
            packages: {
                dependencies: [],
                development: []
            },
            snippets: ['function', 'task', 'watch'],
            directory: '"../public/img/**/*"'
        },
        {
            title: 'Twig (XML)',
            type: 'twig',
            packages: {
                dependencies: [],
                development: []
            },
            snippets: ['function', 'task', 'watch'],
            directory: '"../templates/**/*"'
        },
        {
            title: 'E-Mail',
            type: 'mail',
            packages: {
                dependencies: ['foundation-emails', 'gulp-htmlsplit', 'gulp-htmlmin', 'gulp-inline-css', 'gulp-rename', 'gulp-replace', 'inky', 'siphon-media-query'],
                development: []
            },
            snippets: ['import', 'function', 'task', 'watch'],
            directory: '"../templates/**/*"'
        },
        {
            title: 'Foundation',
            type: 'foundation',
            packages: {
                dependencies: ['foundation-sites', 'jquery', 'what-input'],
                development: []
            },
            snippets: ['script', 'style'],
            directory: '',
            notes: {
                style: [{
                    line: '1',
                    note: 'copy the _settings.scss from node_modules/foundation-sites/scss/settings/ as _foundation-settings.scss into your sass directory and change the util-import to @import \'../node_modules/foundation-sites/scss/util/util\';'
                },
                {
                    line: '2',
                    note: 'either load all styles for the foundation components or adjust CSS output, see: https://foundation.zurb.com/sites/docs/sass.html'
                }]
            },
        }
    ]
}