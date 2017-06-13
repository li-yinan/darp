import AnyProxy from 'anyproxy';
import rule from './rules/index';

import express from 'express';
import bodyParser from 'body-parser';

import {report} from './report';

import open from 'open';

let managePagePort = 8010;

// 启动一个服务器，用于浏览器回传数据
let app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.all('/coverage', (req, res) => {

    let coverage = JSON.parse(req.body.coverage);
    // console.log(JSON.stringify(coverage, null, 4));

    report(coverage, function () {
        open('http://localhost:' + managePagePort + '/report');
        res.json({
            status: 0
        });
    });
});
app.use(express.static(__dirname + '/static'));

app.listen(managePagePort);

// 设置代理
const options = {
    port: 8001,
    rule,
    webInterface: {
        enable: true,
        webPort: 8002,
        wsPort: 8003,
    },
    throttle: 10000,
    forceProxyHttps: false,
    silent: false
};
const proxyServer = new AnyProxy.ProxyServer(options);

proxyServer.on('ready', () => { /* */ });
proxyServer.on('error', (e) => {
    console.log(e);
});
proxyServer.start();

//exit cause ctrl+c
process.on('SIGINT', () => {
    try {
        proxyServer && proxyServer.close();
    } catch (e) {
        console.error(e);
    }
    process.exit();
});

process.on('uncaughtException', (err) => {
    let errorTipText = 'got an uncaught exception, is there anything goes wrong in your rule file ?\n';
    try {
        if (err && err.stack) {
            errorTipText += err.stack;
        } else {
            errorTipText += err;
        }
    } catch (e) {}
    try {
        proxyServer && proxyServer.close();        
    } catch (e) {}
    process.exit();
});

//when finished
//proxyServer.close();

