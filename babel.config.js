module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [
    ["prismjs", {
        "languages": ["javascript", "css", "bash"],
        "plugins": ["line-numbers", "line-highlight"],
        "theme": "default",
        "css": true
    }]
  ]
}
