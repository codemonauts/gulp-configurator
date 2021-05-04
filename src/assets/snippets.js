export default {
    tabs: [
        {
            title: 'Base',
            type: 'base',
            packages: {
                dependencies: ['gulp@4.0.0', 'gulp-load-plugins', 'minimist', 'del', 'gulp-if'],
                development: ['glob-watcher', 'fancy-log', 'beeper', 'gulp-plumber', 'gulp-docker-notify'],
            },
            snippets: [
                {'group': 'simple', 'part': 'base', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'task', 'lang': 'javascript'},
                {'group': 'functionsJs', 'part': 'base', 'lang': 'javascript',
                'note': [{
                    line: 8,
                    note: 'import functions from dedicated file'
                }]},
                {'group': 'functionsJs', 'part': 'functions', 'lang': 'javascript',
                    'note': [{
                        note: 'the base expects this file to be in a directory called tasks'
                    }]
                },
                {'group': 'styleguide', 'part': 'base', 'lang': 'javascript',
                    'note': [{
                        'line': 10,
                        'note': 'import styleguide tasks via hub'
                    }]
                }
            ],
            parts: ['base', 'task', 'functions'],
        },
        {
            title: 'Templates (pug)',
            type: 'pug',
            packages: {
                dependencies: ['gulp-pug-3', 'gulp-rename'],
                development: []
            },
            snippets: [
                    {'group': 'simple', 'part': 'import', 'lang': 'javascript'},
                    {'group': 'simple', 'part': 'function', 'lang': 'javascript'},
                    {'group': 'simple', 'part': 'task', 'lang': 'javascript',
                        'note': [{
                            line: 2,
                            note: 'destination directory for craft 2: ../craft/templates'
                        }]
                    },
                    {'group': 'simple', 'part': 'watch', 'lang': 'javascript'},
                    {'group': 'functionsJs', 'part': 'task', 'lang': 'javascript',
                        'note': [{
                            line: 2,
                            note: 'destination directory for craft 2: ../craft/templates'
                        }]
                    },
                    {'group': 'functionsJs', 'part': 'watch', 'lang': 'javascript'},
                    {'group': 'styleguide', 'part': 'function', 'lang': 'javascript'},
                    {'group': 'styleguide', 'part': 'task', 'lang': 'javascript',
                        'note': [{
                            line: 2,
                            note: 'destination directory for craft 2: ../craft/templates'
                        }]
                    },
                    {'group': 'styleguide', 'part': 'watch', 'lang': 'javascript'}
                ],
            parts: ['import', 'function', 'task', 'watch'],
            directory: '"../templates/**/*"',
            task: 'templates',
            function: 'templates'
        },
        {
            title: 'Styles (sass)',
            type: 'sass',
            packages: {
                dependencies: ['gulp-sass', 'autoprefixer', 'cssnano', 'gulp-postcss'],
                development: ['gulp-sourcemaps']
            },
            snippets: [
                {'group': 'simple', 'part': 'import', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'function', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'task', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'watch', 'lang': 'javascript',
                    'note': [{
                        line: '3',
                        note: 'if using functions.js call sass-function with functions.sass(...)'
                    }]
                }
            ],
            parts: ['import', 'function', 'task', 'watch'],
            directory: '"../public/css/**/*"',
            task: 'sass',
            function: 'style'
        },
        {
            title: 'JavaScript',
            type: 'js',
            packages: {
                dependencies: ['browserify', 'vinyl-source-stream', 'vinyl-buffer', 'babelify', 'gulp-uglify-es', '@babel/core', '@babel/preset-env'],
                development: ['gulp-sourcemaps']
            },
            snippets: [
                {'group': 'simple', 'part': 'import', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'function', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'task', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'watch', 'lang': 'javascript'}
            ],
            parts: ['import', 'function', 'task', 'watch'],
            directory: '"../public/js/**/*"',
            task: 'js',
            function: 'script'
        },
        {
            title: 'Images',
            type: 'img',
            packages: {
                dependencies: [],
                development: []
            },
            snippets: [
                {'group': 'simple', 'part': 'function', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'task', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'watch', 'lang': 'javascript'}
            ],
            parts: ['function', 'task', 'watch'],
            directory: '"../public/img/**/*"',
            task: 'img',
            function: 'imagine'
        },
        {
            title: 'Twig (XML)',
            type: 'twig',
            packages: {
                dependencies: [],
                development: []
            },
            snippets: [
                {'group': 'simple', 'part': 'function', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'task', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'watch', 'lang': 'javascript'}
            ],
            parts: ['function', 'task', 'watch'],
            directory: '"../templates/**/*"',
            task: 'twig',
            function: 'copy'
        },
        {
            title: 'E-Mail',
            type: 'mail',
            packages: {
                dependencies: ['foundation-emails', 'gulp-htmlsplit', 'gulp-htmlmin', 'gulp-inline-css', 'gulp-rename', 'gulp-replace', 'inky', 'siphon-media-query'],
                development: []
            },
            snippets: [
                {'group': 'simple', 'part': 'import', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'function', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'task', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'watch', 'lang': 'javascript'}
            ],
            parts: ['import', 'function', 'task', 'watch'],
            directory: '"../templates/**/*"',
            task: 'email',
            function: 'email'
        },
        {
            title: 'Foundation',
            type: 'foundation',
            packages: {
                dependencies: ['foundation-sites', 'jquery', 'what-input'],
                development: []
            },
            snippets: [
                {'group': 'general', 'part': 'script', 'lang': 'javascript'},
                {'group': 'general', 'part': 'style', 'lang': 'sass',
                    'note': [{
                            line: '1',
                            note: 'copy the _settings.scss from node_modules/foundation-sites/scss/settings/ as _foundation-settings.scss into your sass directory and change the util-import to @import \'../node_modules/foundation-sites/scss/util/util\';'
                        },
                        {
                            line: '2',
                            note: 'either load all styles for the foundation components or adjust CSS output, see: https://foundation.zurb.com/sites/docs/sass.html'
                        }]
                },
            ],
            parts: ['script', 'style'],
            directory: '',
        },
        {
            title: 'Fonts',
            type: 'fonts',
            packages: {
                dependencies: [],
                development: []
            },
            snippets: [
                {'group': 'simple', 'part': 'function', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'task', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'watch', 'lang': 'javascript'}
            ],
            parts: ['function', 'task', 'watch'],
            directory: '"../public/fonts/**/*"',
        },
        {
            title: 'FontAwesome',
            type: 'fontawesome',
            packages: {
                dependencies: ['@fortawesome/fontawesome-pro'],
                development: []
            },
            snippets: [
                {'group': 'simple', 'part': 'additional', 'lang': 'javascript'},
                {'group': 'simple', 'part': 'npmrc', 'lang': 'shell',
                    'note': [{
                        note: 'put file as .npmrc into root source directory next to package.json and gulpfile'
                    }]
                },
                {'group': 'simple', 'part': 'style', 'lang': 'sass',
                    'note': [{
                        note: 'add snippet to fonts function'
                    }]
                }
            ],
            parts: ['additional', 'npmrc', 'style'],
            directory: '',
        },
        {
            title: 'Styleguide',
            type: 'styleguide',
            packages: {
                dependencies: ['malvid', 'p-all', 'continuous-stealthy-require', 'util', 'gulp-hub', 'gulp-multi-dest'],
                development: []
            },
            snippets: [
                {'group': 'styleguide', 'part': 'styleguide', 'lang': 'javascript'},
                {'group': 'styleguide', 'part': 'additional', 'lang': 'javascript'},
            ],
            parts: ['styleguide', 'additional'],
            directory: '"../styleguide/**/*"',
            notes: {
                additional: [{
                    note: 'add to templates task'
                }]
            },
        }
    ]
}
