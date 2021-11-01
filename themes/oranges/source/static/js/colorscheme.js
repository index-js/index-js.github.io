const themeIcon = document.querySelector('#theme-icon')

const switchMode = () => {
    if (colorMode === 'light') {
        colorMode = 'dark'
    } else {
        colorMode = 'light'
    }
    changeIcon()
}

const changeIcon = () => {
    if (colorMode === 'light') {
        themeIcon.className = 'iconfont icon-moon'
    } else {
        themeIcon.className = 'iconfont icon-sun'
    }

    html.setAttribute('color-mode', colorMode)
    localStorage.setItem('color-mode', colorMode)
}

document.querySelector('#switch-color-scheme').addEventListener('click', switchMode, false)

// Init Change Icon
changeIcon()
