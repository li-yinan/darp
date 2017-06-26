import {reportUnCoverage} from '../report';

import {findMergedCoverage} from '../dao/coverage';
import url from 'url';

export default async function (req, res) {
    let coverage = await findMergedCoverage();
    console.log(coverage);
    reportUnCoverage(coverage, function () {
        res.redirect('/report');
    });
}
