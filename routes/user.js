var connection = require("./database");
var fs = require('fs');
var async = require('async');
var parser = require('csv-parse/lib/sync');
var genericFunc = require('./genericFunc');
//console.log(connection);
exports.register = function (req, res) {
    console.log(req.files[0].name);
    fs.readFile(__dirname + '/../public/uploads/' + req.files[0].name, 'utf8', function (err, data) {
        if (err) throw err;
        else {
            if (data.length) {
                var Status = [];
                var userRec = parser(data, {
                    columns: true,
                    trim: true
                });
                //console.log(userRec);
                var no_of_inserted_rec = 0,
                    no_of_not_inserted_rec = 0;
                var task = [];
                userRec.forEach(function (obj) {
                    //console.log(obj.user_type);
                    obj.date_created = new Date();
                    task.push(function (callback) {
                        if (obj.first_name && obj.email) {
                            connection.query("select * from users where email='" + obj.email + "'", function (err, rec) {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                } else {
                                    if (rec.length) {
                                        no_of_not_inserted_rec++;
                                        Status.push("Email Already Exist");
                                        callback();
                                    } else {
                                        genericFunc.insertIntoDB(obj, 'users', function (err, state) {
                                            if (err) {
                                                no_of_not_inserted_rec++;
                                                Status.push(err);
                                                callback();
                                            } else {
                                                no_of_inserted_rec++;
                                                callback();
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            no_of_not_inserted_rec++;
                            Status.push('First Name and Email should not be empty');
                            callback();
                        }
                    });
                });
                async.parallel(task, function (err, result) {
                    if (err) res.send({
                        status: 'fail'
                    });
                    else {
                        fs.unlink(__dirname + '/../public/uploads/' + req.files[0].name, function (err) {
                            if (err) return console.error(err)
                            console.log("Records inserted successfully");
                            console.log("records inserted : " + no_of_inserted_rec);
                            console.log("records rejected : " + no_of_not_inserted_rec);
                            console.log("records rejected status" + JSON.stringify(Status));
                            res.send({
                                status: 'success',
                                inserted_rec: no_of_inserted_rec,
                                not_inserted_rec: no_of_not_inserted_rec,
                                Status: Status
                            });
                        });
                    }
                });
            } else {
                console.log("No data in file");
                res.send("No data in file");
            }
        }
    });
}
exports.login = function (req, res) {
    console.log(req.body);
    connection.query("select * from account a, organization o where a.work_email='" + req.body.email + "' and a.password='" + req.body.password + "' and o.org_code='" + req.body.org_code + "'", function (err, docs) {
        if (err) throw err;
        else {
            if (docs.length) {
                console.log("Login Successfully");
                req.session.user = docs[0];
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                res.send({
                    status: true,
                    user: docs[0]
                });
            } else {
                console.log("Invalid username, password & organization code");
                res.send({
                    status: false,
                    error: 'Invalid Username, Password & Organization Code '
                });
            }
        }
    });
}
exports.getData = function (req, res) {
    var sub = [];
    connection.query("select * from subjects", function (err, docs) {
        if (err) throw err;
        else {
            console.log(docs);
            res.send(docs);
        }
    });
}