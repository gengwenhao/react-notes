/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 1:05
 * @Description: React Component Editor
 */
import React from 'react'

class Editor extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='ui form'>
                <div className="field">
                    <textarea
                        rows='5'
                        placeholder='写点东西'
                    />
                </div>
            </div>
        )
    }
}

export default Editor