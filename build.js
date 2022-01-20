const fs = require('fs')
const path = require('path')
const http = require('http')
const { execSync } = require('child_process')
const dayjs = require('dayjs')

const { srcDir, distDir, meta } = require('./config')
const markdownLoader = require('./plugins/markdown')
const toHtml = require('./views/mustache')
const { groupCategory, listCateGory } = require('./plugins/category')
const { groupTag } = require('./plugins/tag')

const rMarkdown = /\.(md|markdown)$/i


// 清空目录
const clean = () => {
    fs.rmdirSync(distDir, { recursive: true })
}

// 创建并写入文件
const writePageFile = (pagePath, html) => {
    const filePath = path.join(distDir, pagePath)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, html)
}

const build = () => {
    const dirs = fs.readdirSync(srcDir)

    // 处理markdown转换
    const files = dirs.filter(filename => rMarkdown.test(filename))
    const posts = files.map(filename => {
        const content = fs.readFileSync(path.join(srcDir, filename), 'utf8')
        return markdownLoader(content, filename)
    }).sort((a, b) => new Date(b.date) - new Date(a.date))  // 时间倒序

    const categories = groupCategory(posts.map(page => page.categories))
    const tags = groupTag(posts.map(page => page.tags).flat())

    // 生成categories、tags目录页面
    // listCateGory(categories)
    categories.forEach(category => {
        const categoryPath = `categories/${category.slug}/index.html`
        writePageFile(categoryPath, JSON.stringify(category))
    })
    tags.forEach(tag => {
        const tagPath = `tags/${tag.slug}/index.html`
        writePageFile(tagPath, JSON.stringify(tag))
    })

    // 生成首页、分页和404页面
    // TODO page.type = 404 'category' 'tag' 'archive'
    writePageFile('index.html', toHtml(false, meta, null, posts, categories, tags))
    // writePageFile('404.html', toHtml(false, meta))

    // 生成pages目录
    posts.forEach(page => {
        const pagePath = dayjs(page.date).format('YYYY/MM/DD/') + page.filename.replace(rMarkdown, '/index.html')
        writePageFile(pagePath, toHtml(true, meta, page))
    })

    // 复制静态文件
    execSync(`cp -r public/* ${distDir}`)
}


const serve = (port = 3000) => {
    http.createServer((req, res) => {
        let realPath = path.join('dist', decodeURI(req.url))
        if (realPath.endsWith('/')) realPath += 'index.html'

        if (req.method !== 'GET') {
            res.statusCode = 405
        } else if (!realPath.startsWith('dist/')) {
            res.statusCode = 500
        } else {
            const exist = fs.existsSync(realPath)
            const stats = exist ? fs.statSync(realPath) : null

            if (!exist || !stats.isFile()) {
                res.statusCode = 404
            } else {
                fs.createReadStream(realPath).pipe(res)
            }
        }

        if (res.statusCode !== 200) res.end()

        console.log(dayjs().format(), req.method, req.url, res.statusCode)
    }).listen(port)
}


clean()
build()
serve()
