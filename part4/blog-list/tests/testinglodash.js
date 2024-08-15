const _ = require('lodash')

const demo_blogs = require('./demo_blogs')

let blogs = demo_blogs.multiple

// const countBy = (_.countBy(blogs, 'likes'))
// const a = _.map(_.toPairs(countBy), ([author, count]) => {
//     return { 
//         "author": author,
//         "likes": count
//     }
// })
// console.log(countBy)
// console.log(_.maxBy(a, 'likes'))

const c = _.map(_.groupBy(blogs,'author'), (blogs, author) => { 
    return {
        "author": author, 
        "likes": _.sumBy(blogs, 'likes')
    }
})

console.log(c)