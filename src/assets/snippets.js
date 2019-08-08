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
            snippets: ['function', 'task', 'watch']
        }
    ]
}