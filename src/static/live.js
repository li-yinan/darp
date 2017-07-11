function createElement() {
    var div = document.createElement('div');
    div.innerHTML = `
        <style>
            .darp-container {
                padding: 10px;
                background-color: #ddd;
                position: fixed;
                z-index: 999999;
                right: 10px;
                top: 10px;
            }
            .darp-coverage,
            .darp-report,
            .darp-reset {
                background-color: #379fff;
                text-decoration: none;
                border: solid 1px #379fff;
                display: block;
                text-align: center;
                border-radius: 4px;
                margin: 10px;
                padding: 4px;
                color: #fff;
            }
        </style>
        <div class="darp-container">
            <div class="darp-coverage">提交覆盖率数据</div>
            <div class="darp-reset" style="display: none;">重置覆盖率计数</div>
            <a href="//127.0.0.1:8010/mergereport" class="darp-report" target="_blank">展现覆盖率分析</a>
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
    div.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    return div;
}

document.body.appendChild(createElement());

function getUniqueClassName(el) {
    return el.className;
}

function track(e) {
    var el = e.target;
    var text = el.innerText;
    var data = {
        type: e.type
    };
    if (text && text.length > 0 && text.length < 20) {
        data.content = text;
    }
    else {
        data.content = getUniqueClassName(el);
    }
    console.log(data.type, data.content);
}

document.body.addEventListener('click', track, false);
