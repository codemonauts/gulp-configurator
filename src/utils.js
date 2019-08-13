export default {
  githubHistoryUrl: (type, part) => {
    return `https://github.com/codemonauts/gulp-configurator/commits/master/public/snippets/${type}/${part}.txt`
  },
  listPackages(packages, dev = false) {
    var npm = 'npm install '
    packages.forEach(function (name) {
      npm += name + ' '
    })
    npm += dev ? '--save-dev' : '--save'
    return npm
  }
}