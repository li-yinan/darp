import httpProxy from 'http-proxy';

httpProxy.createProxyServer().listen(8003);
console.log('proxy running at port 8003');
