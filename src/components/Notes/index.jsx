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

                console.log('entities', entities)
            })
    }

    createEntity = () => {
        loadCollection('notes')
            .then((collection) => {
                const entity = collection.insert({
                    body: ''
                })

                db.saveDatabase()
                this.setState((prevState) => {
                    const _entities = prevState.entities
                    _entities.unshift(entity)
                    return {
                        entities: _entities
                    }
                })
            })
    }

    render() {
        const entities = this.state.entities
        const noteItems = entities.map((entity) => {
            return (
                <Note key={entity.$loki} entity={entity}/>
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