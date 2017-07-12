/**
 * @file 用户移动鼠标时小窗口自动躲避鼠标，防止遮挡用户操作
 * 
 * @author liyinan
 * @version 1.0
 * @date 2017-07-11
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import Checkbox from 'material-ui/Checkbox';
import {
    mouseNear,
    enableAntiBlock,
    MOUSE_NEAR_TRUE,
    MOUSE_NEAR_FALSE
} from '../actions/index';
// import './floatwindow.less';

function createNegative() {
    let val = null;
    return function (predict, fn) {
        if (typeof  predict === 'function') {
            predict = predict();
        }
        if (val !== predict) {
            val = predict;
            fn();
        }
    }
}

class FloatWindow extends Component {

    constructor() {
        super();
        this.mousemovePtr = _.throttle(this.onmousemove.bind(this), 300);
        this.keyupPtr = _.throttle(this.onkeyup.bind(this), 300);
        this.negative = createNegative();
    }
    componentDidMount() {
        // 绑定鼠标移动事件
        document.body.addEventListener('mousemove', this.mousemovePtr, false);
        document.body.addEventListener('keyup', this.keyupPtr, false);
    }

    componentWillUnmount() {
        // 卸载鼠标移动事件
        document.body.removeEventListener('mousemove', this.mousemovePtr, false);
        document.body.removeEventListener('keyup', this.keyupPtr, false);
    }

    isNear(x, y) {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        let floatWindowWidth = 200;
        let floatWindowHeight = 200;

        if (
            screenWidth - x < floatWindowWidth
            && y < floatWindowHeight
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    onkeyup(e) {
        // b的keyCode是66
        if (e.keyCode === 66 && e.ctrlKey) {
            let currentValue = this.props.floatWindow.enableAntiBlock;
            this.props.dispatch(enableAntiBlock(!currentValue));
        }
    }

    onmousemove(e) {
        let currentValue = this.props.floatWindow.enableAntiBlock;
        if (!currentValue) {
            return;
        }
        let param = '';
        let _this = this;
        if (this.isNear(e.clientX, e.clientY)) {
            param = MOUSE_NEAR_TRUE;
        }
        else {
            param = MOUSE_NEAR_FALSE;
        }
        // 当结果跟上次不同的时候才执行回调
        this.negative(param, function () {
            _this.props.dispatch(mouseNear(param));
        });
    }

    render() {
        let status = this.props.floatWindow.status;
        let antiBlockStatus = this.props.floatWindow.enableAntiBlock;
        let style = {};
        if (status === MOUSE_NEAR_TRUE) {
            style.display = 'none';
        }
        else {
            style.display = '';
        }
        return <div style={style}>
            {this.props.children}
            <div><span><Checkbox checked={antiBlockStatus}/></span>ctrl + b 启用防遮挡功能</div>
        </div>;
    }

}

export default connect(s => s)(FloatWindow);
