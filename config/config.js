/**
 * Created by tangtang on 16/2/1.
 */
"use strict";
var path = require("path");
var _ = require("lodash");
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var base = {
    app: {
        root: path.normalize(path.join(__dirname, "/..")),
        env: env,
    },
};
var specific = {
    development: {
        app: {
            port: process.env.PORT || 6000,
            name: "wechat - Dev",
            keys: [ "super-secret-hurr-durr" ],
        },
        mongo: {
            url: "mongodb://127.0.0.1:27017/cms",
            //option : {
            //    db: { native_parser: true },
            //    server: { poolSize: 5 },
            //    replset: { rs_name: "wechat" },
            //    user: 'ecarlife',
            //    pass: 'Q5tVjCaUZy3bG'
            //}
        },
    },
};

module.exports = _.merge(base, specific[env]);