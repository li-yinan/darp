import {
    Instrumenter
} from 'istanbul';

import darpReporter from '../reporter';

import url from 'url';

let instrumenter = new Instrumenter();

/**
 * 对流量进行分流
 *
 * @param {http.IncomingMessage} req 请求
 * @param {Object} opt 配置信息
 * @param {Array.<Object>} opt.config 配置信息
 *
 */
function reqFilter(req, {config = []}) {

    let parsedUrl =url.parse(req.url);
    let result;

    if (/live\.js/.test(parsedUrl.pathname)) {
        // 这个是本系统自己的js，不做处理
        return;
    }

    config.forEach(item => {
        let type = ({}).toString.call(item.test);
        if (type === '[object RegExp]') {
            let reg = item.test;
            // 正则
            if (reg.test(parsedUrl.pathname)) {
                result = item.callback();
            }
        }
        else if (type === '[object Function]'){
            // function
            let func = item.test;
            if (func(parsedUrl)) {
                result = item.callback();
            }
        }
    });

    return result;
}

export default {
    *beforeSendResponse(requestDetail, responseDetail) {
        let parsedUrl =url.parse(requestDetail.url);
        const newResponse = responseDetail.response;
        return reqFilter(requestDetail, {
            config: [
            {
                test: /\.js$/,
                callback() {
                    newResponse.body = instrumenter.instrumentSync(newResponse.body + '', '/Users/liyinan/code/test/darp/' + parsedUrl.pathname.substr(1));

                    return {
                        response: newResponse
                    };
                }
            },
            {
                test: function () {
                    let resType = newResponse.header['content-type'];
                    return /html/.test(resType);
                },
                callback() {
                    // 给html响应添加自定义的js
                    newResponse.body += '<script src="http://127.0.0.1:8010/live.js"></script>';
                    return {
                        response: newResponse
                    };
                }
            }
            ]
        });
    },
};
