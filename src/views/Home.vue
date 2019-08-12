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
            v-icon(v-if="!item.file")
              | {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            v-icon(v-else)
              | {{ files[item.file] }}
        p If you want to use the functionalities for projects with a different directory structure you need to change the paths in the &nbsp;
          code gulp.src(…)
          | &nbsp; and &nbsp;
          code gulp.dest(…)
          | &nbsp; functions.
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
            },
            {
              name: 'js',
            }
          ]
        },
        {
          name: 'src',
          children: [
            {
              name: 'pug',
            },
            {
              name: 'sass',
            },
            {
              name: 'js',
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
        },
        {
          name: 'composer.json',
          file: 'json'
        },
      ],
    }),
  }
</script>
