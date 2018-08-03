/**
 * @github：github.com/gengwenhao
 * @author GengWenhao
 * @date 2018/8/3
 * @time 0:52
 * @Description: React Component App
 */
import React from 'react'
import Notes from './components/Notes/index'
import 'semantic-ui-css/semantic.min.css'
import './common/index.css'
import './common/font_777110_uoiw1c7bhe/iconfont.css'
import './common/animate.css'

class App extends React.Component {
    render() {
        return (
            <Notes/>
        )
    }
}

export default App