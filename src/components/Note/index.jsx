/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 1:00
 * @Description: React Component Note
 */
import React from 'react'
import Editor from '../Editor/index'
// 格式化时间的包，中文语言
import moment from 'moment'
import 'moment/locale/zh-cn'
// 字符截取的包
import _ from 'lodash'
import {loadCollection, db} from "../../database"

moment.locale('zh-CN')

class Note extends React.Component {
    state = {
        entity: this.props.entity,
        body: this.props.entity.body,
        updated: this.props.entity.meta.updated || this.props.entity.meta.created,
        open: false
    }

    constructor(props) {
        super(props)
    }

    updated() {
        return moment(this.state.updated)
            .fromNow()
    }

    header() {
        return _.truncate(this.state.body, {length: 30}) || '新建笔记'
    }

    words() {
        return this.state.body.length
    }

    toggle = () => {
        this.setState((prevState) => {
            return {
                open: !prevState.open
            }
        })
    }

    updateEntity = (event) => {
        const _body = event.target.value
        this.setState({
            body: _body
        })

        loadCollection('notes')
            .then((collection) => {
                const entity = this.state.entity
                entity.body = _body
                collection.update(entity)
                db.saveDatabase()
            })
    }

    render() {
        return (
            <div className='item'>
                <div className="meta">
                    {this.updated()}
                </div>
                <div className="content">
                    <div className="header" onClick={this.toggle}>
                        {this.header()}
                    </div>
                </div>
                <div className="extra">
                    {
                        this.state.open &&
                        <Editor entity={this.state.entity}
                                updateEntity={this.updateEntity}/>
                    }
                    {this.words()}字
                    {
                        this.state.open &&
                        <i className="right floated trash icon"/>
                    }
                </div>
            </div>
        )
    }
}

export default Note