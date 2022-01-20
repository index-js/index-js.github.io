const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g


const slugize = str => {
    // 自动小写
    return str.replace(rControl, '').replace(rSpecial, '-').toLowerCase()
}

const arrayTree = arr => {
    // 利用map，空间换时间
    const map = arr.reduce((obj, item) => {
        obj[item.name] = item
        return obj
    }, Object.create(null))

    return arr.reduce((list, item) => {
        const parent = map[item.parent]
        if (parent) {
            if (!parent.children) parent.children = []
            parent.children.push(item)
        } else {
            list.push(item)
        }

        return list
    }, [])
}

// TOC以第一个为准
const tocChildren = arr => {
    let result = []

    // 分组转为目录树
    while (arr.length > 0) {
        let endIndex = arr.findIndex((item, index) => index > 0 && item.level <= arr[0].level)
        if (endIndex === -1) endIndex = arr.length

        arr[0].children = tocChildren(arr.slice(1, endIndex))
        result.push(arr[0])

        arr = arr.slice(endIndex)
    }

    return result
}


module.exports = {
    slugize,
    arrayTree,
    tocChildren
}
