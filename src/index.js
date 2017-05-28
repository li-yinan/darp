import AnyProxy from 'anyproxy';
import rule from './rules/index';

import express from 'express';
import bodyParser from 'body-parser';

import {report} from './report';


// 启动一个服务器，用于浏览器回传数据
let app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.all('/coverage', (req, res) => {

    let coverage = JSON.parse(req.body.coverage);
    // console.log(JSON.stringify(coverage, null, 4));

    report(coverage);
    res.json({
        status: 0
    });
});
app.use(express.static(__dirname + '/static'));

app.listen(8010);

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
proxyServer.on('error', (e) => { /* */ });
proxyServer.start();

//when finished
//proxyServer.close();

