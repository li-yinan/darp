/**
 * 小工具集合
 * 
 * @author liyinan
 * @version 1.0
 * @date 2017-06-13
 */

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
