import React from 'react';
import './coverage.less';

function postCoverage() {
    let data = window.__coverage__;
    let suffix = +new Date();
    let div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = `
        <iframe name="formtarget${suffix}" style="display:none;"></iframe>
        <form id="coverageform${suffix}" target="formtarget${suffix}" method="post" action="http://127.0.0.1:8010/coverage">
        <input id="coverage${suffix}" name="coverage" type="hidden"/>
        </form>
    `;
    document.body.appendChild(div);
    let form = div.getElementsByTagName('form')[0];
    let input = div.getElementsByTagName('input')[0];
    let iframe = div.getElementsByTagName('iframe')[0];
    iframe.onerror = iframe.onload = function () {
        document.body.removeChild(div);
    };
    input.value = JSON.stringify(data);
    form.submit();
}

function resetCoverage() {
    var data = window.__coverage__;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var fileCoverage = data[key].s;
            for (var index in fileCoverage) {
                if (fileCoverage.hasOwnProperty(index)) {
                    fileCoverage[index] = 0;
                }
            }
        }
    }
}


export class Coverage extends React.Component {
    render() {
        return <div>
            <div className="darp-coverage" onClick={postCoverage}>提交覆盖率数据</div>
            <div className="darp-reset"  onClick={resetCoverage} style={{display: 'none'}}>重置覆盖率计数</div>
            <a href="//127.0.0.1:8010/mergereport" className="darp-report" target="_blank">展现覆盖率分析</a>
        </div>;
    }
}
