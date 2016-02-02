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
            port: process.env.PORT || 4900,
            name: "wechat - Dev",
            keys: [ "super-secret-hurr-durr" ],
        },
        mongo: {
            url: "mongodb://182.254.240.238:27017/wechat",
            option : {
                db: { native_parser: true },
                server: { poolSize: 5 },
                replset: { rs_name: "wechat" },
                user: 'ecarlife',
                pass: 'Q5tVjCaUZy3bG'
            }
        },
    },
};

module.exports = _.merge(base, specific[env]);