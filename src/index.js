import AnyProxy from 'anyproxy';
import rule from './rules/index';

import express from 'express';
import bodyParser from 'body-parser';

import {exec} from 'grant-setproxy';

import coverage from './router/coverage';
import mergereport from './router/mergereport';
let managePagePort = 8010;

// 启动一个服务器，用于浏览器回传数据
let app = express();

app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: '100000kb'
    })
);

app.all('/coverage', coverage);

app.all('/mergereport', mergereport);

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

proxyServer.on('ready', () => { 
    // server ready之后修改系统代理
    exec('-setwebproxy', 'Wi-Fi', '127.0.0.1', '8001');
    // exec('-setwebproxystate', 'Wi-Fi', 'on');
});
proxyServer.on('error', (e) => {
    console.log(e);
});
proxyServer.start();

async function close() {
    try {
        proxyServer && proxyServer.close();
    } catch (e) {
        console.error(e);
    }
    // 这里暂时不好使，用系统命令就好使，换成c语言的代码调用就不行，有空再搞
    // 可笑的是启动代理可以，关闭代理不行，我信了你的邪
    await exec('-setwebproxystate', 'Wi-Fi', 'off');
    process.exit();
}

//exit cause ctrl+c
process.on('SIGINT', () => {
    close();
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
    close();
});

//when finished
//proxyServer.close();

