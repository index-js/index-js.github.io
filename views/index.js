const fs = require('fs')
const dayjs = require('dayjs')
const handlebars = require('handlebars')

const postTpl = fs.readFileSync(__dirname + '/post.html', 'utf8')
const pageTpl = fs.readFileSync(__dirname + '/page.html', 'utf8')
const headerLayout = fs.readFileSync(__dirname + '/layout/header.html', 'utf8')
const footerLayout = fs.readFileSync(__dirname + '/layout/footer.html', 'utf8')
const tagList = fs.readFileSync(__dirname + '/layout/tagList.html', 'utf8')
const categoryList = fs.readFileSync(__dirname + '/layout/categoryList.html', 'utf8')


handlebars.registerHelper('dateStr', (date, format) => dayjs(date).format(format))
handlebars.registerHelper('ifEqual', (a, b, text) => a === b && text)
handlebars.registerHelper('eq', function(a, b, options) {
    return a == b ? options.fn(this) : options.inverse(this)
})

handlebars.registerPartial('headerLayout', headerLayout)
handlebars.registerPartial('footerLayout', footerLayout)
handlebars.registerPartial('tagList', tagList)
handlebars.registerPartial('categoryList', categoryList)


module.exports = (isPost, meta, datas, page, posts, categories, tags) => {
    const tpl = isPost ? postTpl : pageTpl
    const template = handlebars.compile(tpl)

    return template({ meta, datas, page, posts, categories, tags })
}
