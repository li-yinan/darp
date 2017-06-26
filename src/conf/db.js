import {getRuntimeRoot} from '../util';
import Sequelize from 'sequelize';
import path from 'path';
import mkdirp from 'mkdirp';

let runtimeRoot = getRuntimeRoot();

let dbDir = path.join(runtimeRoot, '.darp');
mkdirp(dbDir);

export let db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: function () {
    },
    storage: path.join(dbDir, 'database.sqlite')
});

export let Coverage = db.define('coverage', {
    title: Sequelize.STRING,
    data: Sequelize.STRING,
    domain: Sequelize.STRING,
    path: Sequelize.STRING,
    isMerged: Sequelize.BOOLEAN
});

Coverage.sync();
