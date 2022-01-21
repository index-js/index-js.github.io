const fs = require('fs')
const path = require('path')
const http = require('http')
const cProcess = require('child_process')
const dayjs = require('dayjs')
const yaml = require('js-yaml')

const { pageDir, postDir, dataDir, distDir, meta } = require('./config')
const markdownLoader = require('./plugins/markdown')
const toHtml = require('./views')
const { groupCategory, listCateGory } = require('./plugins/category')
const { groupTag } = require('./plugins/tag')

const perPage = 10

const rMarkdown = /\.(md|markdown)$/i
const rYaml = /\.(ya?ml)$/i


// 清空目录
const clean = () => {
    fs.rmdirSync(distDir, { recursive: true })
}

// 创建并写入文件
const writePageFile = (pagePath, html) => {
    if (pagePath.endsWith('/')) pagePath += 'index.html'

    const filePath = path.join(distDir, pagePath)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, html)
}

const build = () => {
    // 处理page、markdown、yaml转换
    const pageFiles = fs.readdirSync(pageDir).filter(filename => rMarkdown.test(filename))
    const dataFiles = fs.readdirSync(dataDir).filter(filename => rYaml.test(filename))
    const postFiles = fs.readdirSync(postDir).filter(filename => rMarkdown.test(filename))

    const pages = pageFiles.map(filename => {
        const content = fs.readFileSync(path.join(pageDir, filename), 'utf8')
        return markdownLoader(content, filename)
    }).map(page => {
        // 补充页面的资料
        page.url = page.type == 404 ? '404.html' : `/${page.type}/`
        return page
    })

    const datas = dataFiles.reduce((obj, filename) => {
        const content = fs.readFileSync(path.join(dataDir, filename), 'utf8')
        const data = yaml.safeLoad(content)
        return { ...obj, ...data }
    }, Object.create(null))

    const posts = postFiles.map(filename => {
        const content = fs.readFileSync(path.join(postDir, filename), 'utf8')
        return markdownLoader(content, filename)
    }).map(page => {
        // 补充文章的资料
        page.url = dayjs(page.date).format('YYYY/MM/DD/') + page.filename.replace(rMarkdown, '/')
        return page
    }).sort((a, b) => new Date(b.date) - new Date(a.date))  // 时间倒序

    const categories = groupCategory(posts.map(page => page.categories))
    const tags = groupTag(posts.map(page => page.tags).flat())

    // 生成categories、tags目录页面
    categories.forEach(category => {
        const categoryPath = `categories/${category.slug}/`
        writePageFile(categoryPath, JSON.stringify(category))
    })
    tags.forEach(tag => {
        const tagPath = `tags/${tag.slug}/`
        writePageFile(tagPath, JSON.stringify(tag))
    })

    // 生成post文件页面
    posts.forEach(page => {
        writePageFile(page.url, toHtml(true, meta, datas, page))
    })
    
    // 生成page文件页面
    const list = listCateGory(categories)
    pages.forEach(page => {
        writePageFile(page.url, toHtml(false, meta, datas, page, [], list, tags))
    })

    // 生成首页、分页和404页面
    // TODO page.type = 404 'category' 'tag' 'archive'
    const total = perPage ? Math.ceil(posts.length / perPage) : 1
    for (let i = 1; i <= total; i++) {
        const url = i === 1 ? '/' : `/page/${i}/`
        const data = posts.slice((i - 1) * perPage, i * perPage)
        const page = {
            url,
            size: perPage,
            current: i,
            total,
            prev: 0,
            next: 0,
            prev_link: '',
            next_link: ''
        }
        if (i > 1) {
            page.prev = i - 1
            page.prev_link = i === 2 ? '/' : `/page/${i - 1}/`
        }
        if (i < total) {
            page.next = i + 1
            page.next_link = `/page/${i + 1}/`
        }

        writePageFile(page.url, toHtml(false, meta, datas, page, data))
    }

    // 复制静态文件，同时拷贝隐藏文件
    cProcess.execSync(`cp -r public/. ${distDir}`)
}


const serve = (port = 3000) => {
    console.log(`http://localhost:${port}`)

    http.createServer((req, res) => {
        let realPath = path.join(distDir, decodeURI(req.url))
        if (realPath.endsWith('/')) realPath += 'index.html'

        if (req.method !== 'GET') {
            res.statusCode = 405
        } else if (!realPath.startsWith(path.join(distDir, '/'))) {
            res.statusCode = 503
        } else {
            const exist = fs.existsSync(realPath)
            const stats = exist ? fs.statSync(realPath) : null

            if (!exist || !stats.isFile()) {
                res.statusCode = 404
            } else {
                fs.createReadStream(realPath).pipe(res)
            }
        }

        if (res.statusCode !== 200) {
            const code = res.statusCode
            const message = http.STATUS_CODES[code]
            res.end(code + ' ' + message)
        }

        console.log(dayjs().format(), req.method, req.url, res.statusCode)
    }).listen(port)
}


clean()
build()
serve()
