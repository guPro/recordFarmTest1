// React
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-router-server';
import { matchPath } from 'react-router-dom';

// React Router
import routes from './routes';
import ReactApp from './App';

import ServerStore from './serverStore';

const serverRender = {
    /*
     * @params query.request
     * @params query.response
     * @params query.data
     * @params query.store
     * @params query.author
     */
    default: (query, callback) => {
        query.store = ServerStore();
        renderToString(
            <StaticRouter location={query.request.url} context={{}}>
                <Provider store={query.store}>
                    <ReactApp />
                </Provider>
            </StaticRouter>
        ).then((result) => {
            // result.html
            callback(null, result.html, query.store);
        }).catch((e) => {
            console.log(e);
        });
    },
}
module.exports = serverRender;
