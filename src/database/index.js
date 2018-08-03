// 项目使用到的数据库
import Loki from 'lokijs'

export const db = new Loki('notes', {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 3000,
    // 使用localStorage存储
    persistenceMethod: 'localStorage'
})

// 初始化数据库
function databaseInitialize() {
    // 查询数据库中是否存在notes
    const notes = db.getCollection('notes')
    // 不存在notes, 创建一个
    if (notes === null) {
        db.addCollection('notes')
    }
}

// 加载数据
export function loadCollection(collection) {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(collection || db.addCollection(collection))
            resolve(_collection)
        })
    })
}