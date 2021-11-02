document.querySelector('#share-icon').addEventListener('click', () => {
    const cls = document.querySelector('.share-content').classList
    cls.contains('hidden') ? cls.remove('hidden') : cls.add('hidden')
}, false)
