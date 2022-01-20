const { slugize } = require('./util')


const groupTag = tags => tags
    .reduce((list, tag) => {
        if (tag) {
            const exist = list.find(({ name }) => name === tag)
            if (exist) {
                exist.count += 1
            } else {
                list.push({
                    name: tag,
                    slug: slugize(tag),
                    count: 1
                })
            }
        }
        return list
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name))  // 先ASCII码排序
    .sort((a, b) => b.count - a.count)             // 数量排序

const listTag = tags => {}


module.exports = {
    groupTag,
    listTag
}
