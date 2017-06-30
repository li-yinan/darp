import {getRuntimeRoot, match} from '../util';
import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';
import shell from 'shelljs';

// 项目代码根路径
let runtimeRoot = getRuntimeRoot();

// config目录
let configDir = path.join(runtimeRoot, '.darp');

//  配置文件路径
let configPath = path.join(configDir, 'config.js');

// 默认配置文件路径
let samplePath = path.join(__dirname, 'config.js.sample');

let config = null;

if (!fs.existsSync(configPath)) {
    // 拷贝示例到用户配置文件夹
    shell.cp(samplePath, configPath);
}
config = require(configPath);

export function getConfig() {
    return config;
}

/**
 * url是否需要被打桩
 *
 * @param {String} url url
 *
 * @return {Boolean}
 */
export function needInstrument(url) {
    let {include, exclude} = config.instrument;
    return match(url, include, exclude);
}
