export default {
    githubUrl: (type, part) => {
        return `https://api.github.com/repos/codemonauts/gulp-configurator/contents/snippets/${type}/${part}.txt`
    }
}