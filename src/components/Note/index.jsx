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
    state = {
        entity: this.props.entity,
        body: this.props.entity.body,
        updated: this.props.entity.meta.updated || this.props.entity.meta.created
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='item'>
                <div className="meta">
                    {this.state.updated}
                </div>
                <div className="content">
                    <div className="header">
                        {this.state.body}
                    </div>
                </div>
                <div className="extra">
                    <Editor/>
                    {this.state.body.length}字
                    <i className="right floated trash icon"/>
                </div>
            </div>
        )
    }
}

export default Note