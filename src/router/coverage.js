import {save, findMergedCoverage} from '../dao/coverage';
import {reportUnCoverage} from '../report';
import url from 'url';

/**
 * 存储覆盖率数据
 *
 * @param {Request} req 请求
 * @param {Response} res 响应
 *
 */
export default async function (req, res) {
    let coverage = JSON.parse(req.body.coverage);
    let parsedUrl = url.parse(req.url);
    let data = {
        data: coverage,
        title: '',
        domain: parsedUrl.host,
        path: parsedUrl.path
    };
    // 保存数据
    await save(data);
    let mergedCoverage = await findMergedCoverage();
    reportUnCoverage(coverage, function () {
        res.send(`
            <html></html>
        `);
    });
}
