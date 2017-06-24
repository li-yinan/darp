import open from 'open';
import {report} from '../report';

export default function (req, res) {
    let coverage = JSON.parse(req.body.coverage);
    // console.log(JSON.stringify(coverage, null, 4));

    report(coverage, function () {
        open('http://127.0.0.1:8010/report');
        res.json({
            status: 0
        });
    });
}
