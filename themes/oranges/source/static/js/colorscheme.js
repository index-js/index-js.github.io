const themeIcon = document.querySelector('#theme-icon')
var html = document.documentElement

const switchMode = (colorMode = 'light') => {
    if (colorMode === 'light') {
        colorMode = 'dark'
    } else {
        colorMode = 'light'
    }
    changeColor(colorMode)
}

const changeColor = (colorMode = 'light') => {
    if (colorMode === 'light') {
        themeIcon.className = 'iconfont icon-moon'
    } else {
        themeIcon.className = 'iconfont icon-sun'
    }

    html.setAttribute('color-mode', colorMode)
    localStorage.setItem('color-mode', colorMode)
}

// Restore ColorMode
changeColor(localStorage.getItem('color-mode'))
document.querySelector('#switch-color-scheme').addEventListener('click', () => switchMode(html.getAttribute('color-mode')), false)
