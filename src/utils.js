export default {
  githubApiUrl: (type, part) => {
    return `https://api.github.com/repos/codemonauts/gulp-configurator/contents/snippets/${type}/${part}.txt`
  },
  githubHistoryUrl: (type, part) => {
    return `https://github.com/codemonauts/gulp-configurator/commits/master/snippets/${type}/${part}.txt`
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