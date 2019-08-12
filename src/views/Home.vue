<template lang="pug">
v-container
  v-layout
    v-flex
      h1 Welcome!
      div
        p The gulp snippets on this site are written for &nbsp;
          a(href='https://craftcms.com' target='_blank') Craft CMS-based
          | &nbsp; projects with following directory structure:
        v-treeview(v-model="tree" :open="open" :items="items" item-key="name" open-on-click)
          template(v-slot:prepend="{ item, open }")
            v-icon(v-if="!item.file" :color='item.color')
              | {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            v-icon(v-else)
              | {{ files[item.file] }}
        p If you want to use the functionalities for projects with a different directory structure you need to change the paths in the &nbsp;
          code gulp.src(…)
          | &nbsp; and &nbsp;
          code gulp.dest(…)
          | &nbsp; functions.
        p Local development of the project is done with a &nbsp;
          a(href='https://github.com/codemonauts/docker-craft-cms-dev-env') docker container
          | &nbsp; that serves the website on &nbsp;
          code localhost:8080
          |. For development without the docker container you need to implement your own local server, e.g. with browser-sync, and the gulp-docker-notify dependency as well as the corresponding functions are obsolete.
        p Files will be loaded from the src-directory, processed and the results copied to the same colored destination directories in public and templates.
        p On each snippet tab and the generated output you'll find &nbsp;
          code npm install
          | &nbsp; commands for installing all necessary dependencies and development dependencies. Copy the command into your clipboard via the &nbsp;
          v-icon mdi-content-copy
          | -button.
        p The gulpfile provides two main tasks: default and build. Please run &nbsp;
          code gulp
          | &nbsp; for local development, which cleans all destination directories and starts the watch task. For production deployment run &nbsp;
          code gulp build
          |.
</template>

<script>
export default {
    data: () => ({
      open: ['src'],
      files: {
        js: 'mdi-nodejs',
        json: 'mdi-json',
        sass: 'mdi-sass',
      },
      tree: [],
      items: [
        {
          name: 'config',
        },
        {
          name: 'modules',
        },
        {
          name: 'public',
          children: [
            {
              name: 'css',
              color: 'blue'
            },
            {
              name: 'js',
              color: 'green'
            }
          ]
        },
        {
          name: 'src',
          children: [
            {
              name: 'email',
              children: [
                {
                  name: 'pug'
                },
                {
                  name: 'sass',
                  children: [
                    {
                      name: 'styles.sass',
                      file: 'sass'
                    },
                    {
                      name: 'fonts.sass',
                      file: 'sass'
                    },
                  ]
                },
              ]
            },
            {
              name: 'twig',
              color: 'orange'
            },
            {
              name: 'pug',
              color: 'orange'
            },
            {
              name: 'sass',
              color: 'blue'
            },
            {
              name: 'js',
              color: 'green'
            },
            {
              name: 'gulpfile.js',
              file: 'js'
            },
            {
              name: 'package.json',
              file: 'json'
            },
          ],
        },
        {
          name: 'templates',
          color: 'orange'
        },
        {
          name: 'composer.json',
          file: 'json'
        },
      ],
    }),
  }
</script>
