const { slugize, arrayTree } = require('./util')


const groupCategory = categories => categories
    .reduce((list, arr) => {
        if (arr) {
            while(arr.length) {
                const exist = list.find(({ id }) => id === arr.join('/'))
                if (exist) {
                    exist.count += 1
                } else {
                    list.push({
                        id: arr.join('/'),
                        parent: arr.slice(0, -1).join('/'),
                        name: arr.slice(-1)[0],
                        slug: arr.map(slugize).join('/'),
                        count: 1
                    })
                }
                arr.pop()
            }
        }
        return list
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name))  // 先ASCII码排序
    .sort((a, b) => b.count - a.count)             // 数量排序

const listCateGory = categories => {
    const tree = arrayTree(categories)

    return tree
}


module.exports = {
    groupCategory,
    listCateGory
}
