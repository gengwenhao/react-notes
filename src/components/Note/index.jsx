/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 1:00
 * @Description: React Component Note
 */
import React from 'react'
import Editor from '../Editor/index'

class Note extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='item'>
                <div className="meta">
                    {'updated'}
                </div>
                <div className="content">
                    <div className="header">
                        {'笔记项目'}
                    </div>
                </div>
                <div className="extra">
                    <Editor/>
                    {'X'}字
                    <i className="right floated trash icon">

                    </i>
                </div>
            </div>
        )
    }
}

export default Note