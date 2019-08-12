module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [
    ["prismjs", {
        "languages": ["javascript", "css", "bash", "sass"],
        "plugins": ["line-numbers", "line-highlight"],
        "theme": "default",
        "css": true
    }]
  ]
}
