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
        p Files will be loaded from the src-directory, processed and the results copied to the same colored destination directories in public and templates.
        p On each snippet tab and the generated output you'll find &nbsp;
          code npm install
          | &nbsp; commands for installing all necessary dependencies and development dependencies. Copy the command into your clipboard via the &nbsp;
          v-icon mdi-content-copy
          | -button.
</template>

<script>
export default {
    data: () => ({
      open: ['src'],
      files: {
        js: 'mdi-nodejs',
        json: 'mdi-json',
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
