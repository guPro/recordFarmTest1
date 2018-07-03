const dbConfig = require(__base + 'config/db.conf.json');
const mysql = require('mysql');

// Config
const c = require('../../config/const.json');

module.exports = {
    init: () => {
        console.log('dbConnectionHelper.js :: init :: Database Connection Start');
        dbConfig.app.acquireTimeout = Number.POSITIVE_INFINITY;
        global.poolCluster = mysql.createPoolCluster();
        global.poolCluster.add(c.APP_NAME, dbConfig.app);
    },
    // callback ( )
    end: (callback) => {
        console.log('dbConnectionHelper.js :: end :: Database Connection End');
        global.poolCluster.end((err) => {
            if (err) console.error(err);
            callback();
        });
    },
    // callback ( err, connection )
    getConnection: (callback) => {
        global.poolCluster.getConnection(c.APP_NAME, (err, connection) => {
            if (err) {
                console.error('dbConnectionHelper.js :: getConnection :: Database getConnection Failed');
                console.error(err);
            }
            callback(err, connection);
        });
    },
};