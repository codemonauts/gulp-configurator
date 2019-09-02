export default {
  githubHistoryUrl: (type, group, part) => {
    return `https://github.com/codemonauts/gulp-configurator/commits/master/public/snippets/${type}/${group}/${part}.txt`
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