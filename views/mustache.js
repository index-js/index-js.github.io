const fs = require('fs')
const mustache = require('mustache')


const postTpl = fs.readFileSync(__dirname + '/post.html', 'utf8')
const pageTpl = fs.readFileSync(__dirname + '/page.html', 'utf8')
const headerLayout = fs.readFileSync(__dirname + '/layout/header.html', 'utf8')
const footerLayout = fs.readFileSync(__dirname + '/layout/footer.html', 'utf8')


const layout = {
    headerLayout,
    footerLayout
}

const helper = {
    dateF() {
        return (text, render) => {
            return render(text).slice(0, 10)
        }
    },
    yearF() {
        return (text, render) => {
            return render(text).slice(0, 4)
        }
    },
    monthDay() {
        return (text, render) => {
            return render(text).slice(5, 10)
        }
    }
}


module.exports = (isPost, meta, page, posts, categories, tags) => {
    if (isPost) {
        return mustache.render(postTpl, { meta, page, ...helper }, layout)
    } else {
        return mustache.render(pageTpl, { meta, page, posts, categories, tags, ...helper }, layout)
    }
}
