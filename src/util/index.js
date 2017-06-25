/**
 * 小工具集合
 * 
 * @author liyinan
 * @version 1.0
 * @date 2017-06-13
 */

import path from 'path';
import fs from 'fs';

/**
 * 因为http header不区分大小写，所以有content-type, Content-type, content-Type等，这里统一处理，省事
 *
 * @param {HTTPRequest} req http request
 * @param {string} name 需要取的header名称，不区分大小写
 *
 * @return {string}
 */
export function getHeader(req, name) {
    name = name.toLowerCase();
    let header = req.header;

    for (var key in header) {
        if (header.hasOwnProperty(key)) {
            if (key.toLowerCase() === name) {
                return header[key];
            }
        }
    }
}

function hasPackageJson(dir) {
    return fs.existsSync(path.join(dir, 'package.json'));
}

/**
 * 获取运行目录的根路径
 *
 * @return {String}
 */
export function getRuntimeRoot() {
    let runtimePath = process.cwd();
    while(!hasPackageJson(runtimePath)) {
        let parsedPath = path.parse(runtimePath);
        runtimePath  = parsedPath.dir;
        if (runtimePath === '/') {
            return process.cwd();
        }
    }
    return runtimePath;
}
