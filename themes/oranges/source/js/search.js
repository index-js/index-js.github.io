const safeRegex = /[\^\(\)\.\*\+\?\[\|\$\\]/g
const splitWord = /[\s\-]+/

const searchFunc = (path, search_id, content_id, trans) => {
  const contentEle = document.getElementById(content_id)

  // Init Loading
  contentEle.innerHTML = `<ul><span class="local-search-empty">${trans.searchFirst}<span></ul>`
  fetch(path).then(res => {
    if (res.ok) return res.json()
    else throw [res.status, res.statusText]
  }).then(data => {
    contentEle.innerHTML = ''

    // Watch Input
    document.getElementById(search_id).addEventListener('input', function () {
      contentEle.innerHTML = ''

      const value = this.value.trim().replace(safeRegex, '\\$&')
      if (value === '') return

      const regS = new RegExp(value.replace(splitWord, '|'), 'gi')
      const filter = data.map(item => {
        if (!item.title) item.title = 'Untitled'

        if (regS.test(item.title) || regS.test(item.content)) {
          // total 150, before 20
          let start = item.content.search(regS) - 20
          if (start < 0) start = 0
          let content = item.content.slice(start, start + 150)

          // Replace keywords
          content = content.replace(regS, '<span class="search-keyword">$&</span>')
          const title = item.title.replace(regS, '<span class="search-keyword">$&</span>')

          return `<li>
            <a href="${item.url}" class="search-result-title">${title}</a>
            <p class="search-result-abstract">${content}</p>
          </li>`
        }
        return
      }).filter(item => item)

      if (filter.length === 0) {
        return contentEle.innerHTML = `<ul><span class="local-search-empty">${trans.searchNoResult}<span></ul>`
      } else {
        contentEle.innerHTML = '<ul class="search-result-list">' + filter.join('') + '</ul>'
      }
    })
  }).catch(err => {
    if (err[0] === 404) {
      contentEle.innerHTML = `<ul><span class="local-search-empty">${trans.searchFilesNotfound}<a href='https://github.com/zchengsite/hexo-theme-oranges#configuration' target='_black'>configuration</a><span></ul>`
    } else {
      contentEle.innerHTML = `<ul><span class="local-search-empty">${trans.searchServiceErrors}<span></ul>`
    }
  })
}
