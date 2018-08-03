/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 0:59
 * @Description: React Component Notes
 */
import React from 'react'
import Note from '../Note/index'
import {loadCollection, db} from "../../database"

class Notes extends React.Component {
    constructor(props) {
        super(props)

        this.getInitialData()
    }

    state = {
        entities: []
    }

    // 数据初始化
    getInitialData() {
        loadCollection('notes')
            .then((collection) => {
                // collection.insert([
                //     {body: 'hello~'},
                //     {body: 'hola~'}
                // ])

                db.saveDatabase()

                const entities = collection
                    .chain()
                    .find()
                    .simplesort('$loki', true)
                    .data()
                this.setState({
                    entities
                })
            })
    }

    // 创建笔记
    createEntity = () => {
        loadCollection('notes')
            .then((collection) => {
                // 操作数据库
                const entity = collection.insert({
                    body: ''
                })
                db.saveDatabase()

                // 更改state状态
                this.setState((prevState) => {
                    const _entities = prevState.entities
                    _entities.unshift(entity)
                    return {
                        entities: _entities
                    }
                })
            })
    }

    //销毁笔记
    destroyEntity = (entity) => {
        // 更改state状态
        const _entities = this.state.entities.filter((_entity) => {
            return _entity.$loki !== entity.$loki
        })

        this.setState({
            entities: _entities
        })

        // 操作数据库
        loadCollection('notes')
            .then((collection) => {
                collection.remove(entity)
                db.saveDatabase()
            })
    }

    render() {
        const entities = this.state.entities
        const noteItems = entities.map((entity) => {
            return (
                <Note
                    key={entity.$loki}
                    entity={entity}
                    destroyEntity={this.destroyEntity}
                />
            )
        })

        return (
            <div className='ui container notes'>
                <h4 className='ui horizontal divider header'>
                    <i className="paw icon"/>
                    React Notes
                </h4>
                <button className="ui right floated base violet button" onClick={this.createEntity}>
                    添加笔记
                </button>
                <div className="ui divided items">
                    {noteItems}
                    {
                        !entities.length &&
                        <span className="ui small disabled header">
                            还木有笔记哦，按下'添加笔记'按钮
                        </span>
                    }
                </div>
            </div>
        )
    }
}

export default Notes