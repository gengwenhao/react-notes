/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 0:59
 * @Description: React Component Notes
 */
import React from 'react'
import Note from '../Note/index.jsx'

class Notes extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='ui container notes'>
                <h4 className='ui horizontal divider header'>
                    <i className="paw icon"/>
                    React Notes
                </h4>
                <button className="ui right floated base violet button">
                    添加笔记
                </button>
                <div className="ui divided items">
                    <Note/>
                    <span className="ui small disabled header">
                        还没有笔记，请按下'添加笔记'按钮
                    </span>
                </div>
            </div>
        )
    }
}

export default Notes