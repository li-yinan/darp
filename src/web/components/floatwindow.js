/**
 * @file 用户移动鼠标时小窗口自动躲避鼠标，防止遮挡用户操作
 * 
 * @author liyinan
 * @version 1.0
 * @date 2017-07-11
 */

import React, {Component} from 'react';

export class FloatWindow extends Component {

    componentDidMount() {
        // 绑定鼠标移动事件
        document.body.addEventListener('mousemove', this.onmousemove, false);
    }

    componentWillUnmount() {
        // 卸载鼠标移动事件
        document.body.removeEventListener('mousemove', this.onmousemove, false);
    }

    onmousemove(e) {
    }

    render() {
        return <div style={{display: 'block'}}>
            {this.props.children}
        </div>;
    }

}
