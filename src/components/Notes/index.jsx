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
            <div>
                <h4>React Notes</h4>
                <Note/>
            </div>
        )
    }
}

export default Notes