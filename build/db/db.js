"use strict";
const DB = require('mongoose');
const conf = require("../config");
module.exports = function () {
    var connect = function () {
        DB.connect(conf.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    };
    connect();
    // Error handler
    DB.connection.on('error', function (err) {
        console.error('MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
    });
    // Reconnect when closed
    DB.connection.on('disconnected', function () {
        connect();
    });
};
//# sourceMappingURL=db.js.map