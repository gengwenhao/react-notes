/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 1:00
 * @Description: React Component Note
 */
import React from 'react'
import Editor from '../Editor/index.jsx'

class Note extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                笔记项目
                <Editor/>
            </div>
        )
    }
}

export default Note