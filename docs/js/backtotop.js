// back to top js
let scrollTop = 0
var html = document.documentElement

function isHidden() {
  scrollTop = html.scrollTop || document.body.scrollTop
  const cls = document.querySelector('.back-to-top').classList

  scrollTop > 0 ? cls.remove('hidden') : cls.add('hidden')
}

const backToTop = (ele, delay = 10, time = 200) => {
  const step = Math.ceil(scrollTop * delay / time)

  let timer = setInterval(() => {
    scrollTop -= step
    if (scrollTop <= 0) {
      scrollTop = 0
      clearInterval(timer)
    }
    html.scrollTop = scrollTop
    document.body.scrollTop = scrollTop
  }, delay)
}

isHidden()
document.addEventListener('scroll', isHidden, false)
document.querySelector('.back-to-top').addEventListener('click', backToTop, false)
