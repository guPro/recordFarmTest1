
global.__base = __dirname + '/';
global.poolCluster = null;

try {
// Library
    const fs = require('fs');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const passport = require('passport');
    const express = require('express');
    const path = require('path');
    const async = require('async');
    const MySQLStore = require('express-mysql-session')(session);
    const React = require('react');

// Lib
    const dbConnectionHelper = require('./lib/db/dbConnectionHelper');

// Models
    const Models = require('./models/index');

// Config
    const c = require('./config/const.json');

// DB connection init
    dbConnectionHelper.init();

    const app = express();
    app.set('port', process.env.PORT || 8080);
    app.use(express.static(path.join(__dirname, '/public')));
    app.set('views', path.join(__dirname, '/public'));
    app.set('view engine', 'ejs');
    app.set('json spaces', 2);
    app.use(cookieParser());
    const dbConfig = require(__base + 'config/db.conf.json').app;

    dbConfig.createDatabaseTable = true;
    dbConfig.schema = {
        tableName: 'sessions',
        columnNames: { // 이 폼은 건드리지 말 것
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        },
    };
    app.use(session({ resave: true,
        saveUninitialized: false,
        rolling: true,
        secret: 'codecrain',
        store: new MySQLStore(dbConfig),
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'bower_components')));
    app.use(passport.initialize());
    app.use(passport.session());

// Serve static files
    app.use('/testApp', express.static(path.join(__dirname, '../public/' + c.APP_NAME), { maxAge: 30 }));
    app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'), { maxAge: 30 }));
    app.use('/sitemap.xml', express.static(path.join(__dirname, 'src/build/sitemap.xml'), { maxAge: 30 }));

// **  API
// Route Common
    const routeClientTestApp = require('./routers/TestApp');
    const routeAuth = require('./routers/api/auth');
    const routeUpload = require('./routers/api/upload');

    app.use('/api', routeAuth());
    app.use('/api', routeUpload());

// Route App
    routeClientTestApp(app);

// Server
    const server = app.listen(app.get('port'), () => {
        console.log('app.js :: app.listen :: Server Start on port number ' + app.get('port'));
    });


} catch (e) {
    console.log(e);
}
