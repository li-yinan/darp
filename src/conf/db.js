import {getRuntimeRoot} from '../util';
import Sequelize from 'sequelize';
import path from 'path';
import mkdirp from 'mkdirp';

let runtimeRoot = getRuntimeRoot();

let dbDir = path.join(runtimeRoot, '.darp');
mkdirp(dbDir);

export const db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    storage: path.join(dbDir, 'database.sqlite')
});
