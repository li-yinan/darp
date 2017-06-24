import {
    Instrumenter
} from 'istanbul';

import darpReporter from '../reporter';

import url from 'url';

import path from 'path';

import config from 'config';

import {getHeader} from '../util/index';

let sourceDir = '';

try {
    sourceDir = config.get('source');
}
catch (e) {
    sourceDir = './';
}

let sourcePath = path.join(process.cwd(), sourceDir);
// console.log('>>>>>>', sourcePath, '<<<<<<');

let instrumenter = new Instrumenter({
    debug: false,
    walkDebug: false,
    coverageVariable: '__coverage__',
    codeGenerationOptions: {
        sourceMap: true,
        sourceMapWithCode: true,
        sourceContent: true
    },
    noAutoWrap: false,
    noCompact: false,
    embedSource: true,
    preserveComments: false,
    esModules: false
});

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
                test: function () {
                    if (/\.js$/.test(parsedUrl.pathname)) {
                        if (!/dep|\.min\./.test(parsedUrl.pathname)) {
                            if (parsedUrl.port !== '8010') {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                callback() {
                    newResponse.body = instrumenter.instrumentSync(newResponse.body + '', path.join(sourcePath, parsedUrl.pathname));

                    return {
                        response: newResponse
                    };
                }
            },
            {
                test: function () {
                    let resType = getHeader(newResponse, 'content-type');
                    if (/html/.test(resType)) {
                        if (parsedUrl.port !== '8010') {
                            return true;
                        }
                    }
                    
                    return false;
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
