const fm = require('front-matter')
const marked = require('marked')
const { tocChildren } = require('./util')


// https://marked.js.org/using_advanced
class Renderer extends marked.Renderer {
    constructor() {
        super()
        this.tocList = []
    }

    heading(text, level) {
        this.tocList.push({ text, level })

        return super.heading(...arguments)
    }

    link() {
        const html = super.link(...arguments)
        return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ')
    }
}


module.exports = (text, filename) => {
    const { body, attributes } = fm(text, { allowUnsafe: true })

    const renderer = new Renderer()
    const html = marked.parse(body, {
        renderer,
        breaks: true,
        langPrefix: 'line-numbers language-'
    })

    return {
        ...attributes,
        filename,
        body,
        html: html.trim(),
        toc: tocChildren(renderer.tocList)
    }
}
