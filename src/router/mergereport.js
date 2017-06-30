import {reportUnCoverage} from '../report';

import {findMergedCoverage} from '../dao/coverage';
import url from 'url';

/**
 * 生成最新一次报告，跳转到这个报告
 *
 * @param {Object} req request
 * @param {res} res response
 *
 * @return 
 */
export default async function (req, res) {
    let coverage = await findMergedCoverage();
    reportUnCoverage(coverage, function () {
        res.redirect('/report');
    });
}
