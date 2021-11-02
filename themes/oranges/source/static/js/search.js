const safeRegex = /[\^\(\)\.\*\+\?\[\|\$\\]/g
const splitWord = /[\s\-]+/

const searchFunc = (path, search_id, content_id) => {
  const contentEle = document.getElementById(content_id)

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
          content = content.replace(regS, '<b class="keyword">$&</b>')
          const title = item.title.replace(regS, '<b class="keyword">$&</b>')

          return `<li>
            <a href="${item.url}" class="search-result-title">${title}</a>
            <p class="search-result-abstract">${content}</p>
          </li>`
        }
        return
      }).filter(item => item)

      if (filter.length === 0) {
        return contentEle.innerHTML = '<ul><span class="local-search-empty">没有找到内容，更换下搜索词试试吧~<span></ul>'
      } else {
        contentEle.innerHTML = '<ul class="search-result-list">' + filter.join('') + '</ul>'
      }
    })
  }).catch(console.error)
}

function openOrHideSearchContent() {
  let isHidden = searchOverlayArea.classList.contains('hidden')
  if (isHidden) {
    searchOverlayArea.classList.remove('hidden')
    document.body.classList.add('hidden')

    searchFunc('/search.json', 'search-input', 'search-result')
  } else {
    searchOverlayArea.classList.add('hidden')
    document.body.classList.remove('hidden')
  }
}


document.querySelector("#search-icon").addEventListener("click", openOrHideSearchContent, false)
document.querySelector("#search-close-icon").addEventListener("click", openOrHideSearchContent, false)

const searchOverlayArea = document.querySelector(".search-overlay")
searchOverlayArea.addEventListener("click", e => {
  if (e.target === searchOverlayArea) {
    openOrHideSearchContent()
  }
}, false)
