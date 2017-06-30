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

/**
 * 把两个覆盖率数据merge到一起
 *
 * @param {Object} from
 * @param {Object} to
 */
export function maxMerge(from, to) {
    if (typeof from === 'object') {
        if (Array.isArray(from)) {
            // 数组
            from.forEach((item, index) => {
                if (typeof item === 'object') {
                    // 内部是数组或者对象，递归
                    maxMerge(item, to[index]);
                }
                else {
                    // 基本数据结构，直接赋值
                    // to[index] = from[index];
                    if (Number.isInteger(from[index])) {
                        // 数字的取最大的merge
                        to[index] = Math.max(from[index], to[index]);
                    }
                    else {
                        // 其他的，如字符串，直接merge
                        to[index] = from[index];
                    }
                }
            });
        }
        else {
            // 对象
            for (var key in from) {
                if (typeof from[key] === 'object') {
                    // 内部是数组或者对象，递归
                    maxMerge(from[key], to[key]);
                }
                else {
                    // 基本数据结构，直接赋值
                    // to[index] = from[index];
                    if (Number.isInteger(from[key])) {
                        // 数字的取最大的merge
                        to[key] = Math.max(from[key], to[key]);
                    }
                    else {
                        // 其他的，如字符串，直接merge
                        to[key] = from[key];
                    }
                }
            }
        }
    }
    // 基本数据结构，这里不可能出现
}

/**
 * 判断一个字符串是否符合一串规则
 *
 * @param {String} str string
 * @param {Array.<RegExp|Function>} rules
 *
 * @return {Boolean}
 */
export function match(str = '', include = [], exclude = []) {
    let res = false;
    if (!include.length) {
        // include为空，代表一切都通过
        res = true;
    }
    else {
        // 任意一个是true就是匹配成功
        res = include.reduce((res, item) => {
            if (({}).toString.call(item) === '[object RegExp]') {
                // 正则
                return res || item.test(str);
            }
            else if (({}).toString.call(item) === '[object Function]') {
                // function
                return res || item(str);
            }
            else {
                return false;
            }
        }, false);
    }
    if (res) {
        // 如果include匹配成功，就继续匹配exclude
        if (!exclude.length) {
            // 没有exclude直接返回true
            return true;
        }
        else {
            // 有exclude的，只要有一个匹配就是false
            return !exclude.reduce((res, item) => {
                if (({}).toString.call(item) === '[object RegExp]') {
                    // 正则
                    return res || item.test(str);
                }
                else if (({}).toString.call(item) === '[object Function]') {
                    // function
                    return res || item(str);
                }
                else {
                    return false;
                }
            }, false);
        }
    }
    else {
        // include匹配失败，直接返回false
        return false;
    }
}
