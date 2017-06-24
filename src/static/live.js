function createElement() {
    var div = document.createElement('div');
    div.innerHTML = `
        <style>
            .darp-container {
                padding: 10px;
                background-color: #ddd;
                position: fixed;
                right: 10px;
                top: 10px;
            }
            .darp-coverage,
            .darp-reset {
                background-color: #379fff;
                border: solid 1px #379fff;
                border-radius: 4px;
                margin: 10px;
                padding: 4px;
                color: #fff;
            }
        </style>
        <div class="darp-container">
            <div class="darp-coverage">提交覆盖率数据</div>
            <div class="darp-reset">重置覆盖率计数</div>
        </div>
        <div style="display: none;">
            <iframe name="formtarget" style="display:none;"></iframe>
            <form id="coverageform" target="formtarget" method="post" action="http://127.0.0.1:8010/coverage">
                <input id="coverage" name="coverage" type="hidden"/>
            </form>
        </div>
    `;
    div.getElementsByClassName('darp-reset')[0].onclick = function () {
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
    };
    div.getElementsByClassName('darp-coverage')[0].onclick = function () {
        var data = window.__coverage__;
        if (data) {
            var input = document.getElementById('coverage');
            input.value = JSON.stringify(data);
            var form = document.getElementById('coverageform');
            form.submit();
        }
    };
    return div;
}

document.body.appendChild(createElement());
