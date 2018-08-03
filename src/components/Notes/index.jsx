/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 0:59
 * @Description: React Component Notes
 */
import React from 'react'
import Note from '../Note/index'
import {databaseReset, loadCollection, db} from "../../database"
import Notifications, {notify} from 'react-notify-toast'

class Notes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entities: []
        }

        this.getInitialData()
    }

    showTips = (tipMsg, type = 'custom', timeout = 2000) => {
        let myColor = {background: '#5829bb', text: "#e3e9e0"};
        notify.show(tipMsg, type, timeout, myColor);
    }

    // 数据初始化
    getInitialData() {
        loadCollection('notes')
            .then((collection) => {
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
        console.log('createEntity')
        console.log('entities', this.state.entities)
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
                this.showTips('添加了新的笔记, 点击标题修改')
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
            })
    }

    // 清空笔记
    clearEntities = () => {
        const entities = []

        this.setState({
            entities
        })

        // 操作数据库
        databaseReset('notes')
            .then(()=>{
                this.showTips('清空完成')
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
                <Notifications/>
                <h4 className='ui horizontal divider header'>
                    <i className="icon iconfont icon-note"/>
                    <span>React</span> <span>Notes</span>
                </h4>
                <div className="ui three tiny violet buttons">
                    <button className="ui button" onClick={this.clearEntities}>
                        清空本地
                    </button>
                    <a className="ui button" href='//github.com/gengwenhao/react-notes'>
                        关于React Notes
                    </a>
                    <button className="ui button" onClick={this.createEntity}>
                        新的笔记
                    </button>
                </div>
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