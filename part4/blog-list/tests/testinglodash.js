const _ = require('lodash')

const demo_blogs = require('./demo_blogs')

let blogs =  []
const countBy = (_.countBy(blogs, 'author'))
const a = _.map(_.toPairs(countBy), ([author, count]) => {
    return { 
        "author": author,
        "blogs": count
    }
})

console.log(a)
console.log(_.orderBy(a, 'blogs', 'desc'))