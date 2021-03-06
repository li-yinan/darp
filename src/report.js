import {
    Instrumenter,
    Collector,
    Reporter
} from 'istanbul';

let instrumenter = new Instrumenter();


import darpReporter from './reporter';

export function reportCoverage(__coverage__, callback) {
    let collector = new Collector();
    let reporter = new Reporter(null, __dirname + '/static/report');
    let sync = false;

    collector.add(__coverage__);

    // reporter.add('text');
    // reporter.addAll([ 'lcov', 'clover' ]);
    // reporter.add('lcov');
    // reporter.add('html');
    reporter.add('darp');

    reporter.write(collector, sync, function () {
        console.log('>>>>report generate done<<<<');
        callback();
    });
}

/**
 * 生成没有被覆盖的代码报告
 *
 * @param {Object} __coverage__ 覆盖率数据
 * @param {Function} callback 回调函数
 */
export function reportUnCoverage(__coverage__, callback) {
    let collector = new Collector();
    let reporter = new Reporter(null, __dirname + '/static/report');
    let sync = false;

    collector.add(__coverage__);

    reporter.add('html');

    reporter.write(collector, sync, function () {
        console.log('>>>>report generate done<<<<');
        callback();
    });
}
