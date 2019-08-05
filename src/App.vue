<template lang="pug">
  v-app
    v-app-bar(app)
      v-toolbar-title.headline.text-uppercase
        span gulp
        span.font-weight-light configurator
      v-btn(text to="configurator")
        span.mr-2 Configurator
      v-btn(text to="snippets")
        span.mr-2 Snippets
      v-spacer
      v-btn(text href="https://github.com/codemonauts/gulp-configurator" target="_blank")
        span.mr-2 Repository

    v-content
      router-view
</template>

<script>

export default {
  name: 'App',
};
</script>
