var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'talent_clouds',
    user: 'root',
    password: ''
});
var connectionState = false;
connection.on('close', function (err) {
    console.log('mysqldb conn close');
    connectionState = false;
});
connection.on('error', function (err) {
    console.log('mysqldb error: ' + err);
    connectionState = false;
});

function handleDisconnect() {
    if (!connectionState) {
        connection = mysql.createConnection(connection.config);
        //console.log(connection);
        connection.connect(function (err) {
            // connected! (unless `err` is set)
            if (err) {
                console.log('mysql db unable to connect: ' + err);
                connectionState = false;
            } else {
                console.log('mysql connect!');

                connectionState = true;
            }
        });
        connection.on('close', function (err) {
            console.log('mysqldb conn close');
            connectionState = false;
        });
        connection.on('error', function (err) {
            console.log('mysqldb error: ' + err);

            if (!err.fatal) {
                //throw err;
            }
            if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
                //throw err;
            } else {
                connectionState = false;
            }

        });
    }
}

handleDisconnect(connection);
var dbConnChecker = setInterval(function () {
    if (!connectionState) {
        console.log('not connected, attempting reconnect');
        handleDisconnect(connection);
    }
}, 1000);
module.exports = connection;