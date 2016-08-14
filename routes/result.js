var express = require('express');
var fs = require('fs');
var async = require('async');
var genericFunc = require('./genericFunc');
//console.log(genericFunc);
var parser = require('csv-parse/lib/sync');
var connection = require("./database");
//console.log(connection);
var router = express.Router();
router.get("/",function(req,res){
	connection.query("select * from result where student_id='" + req.query.id + "'", function (err, docs) {
        if (err) throw err;
        else {
            if (docs.length) {
                console.log(docs);
                res.send(docs);
            } else {
                console.log("No result found");
                res.send("No result found");
            }
        }
    });
});
router.post("/", function (req, res) {
    //console.log(req.files);
    var task = [];
    fs.readFile(__dirname + '/../public/uploads/' + req.files.file.name, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        //console.log(parser(data).asRows());
        var resultData = parser(data).asRows();
        /*Get All from Database*/
        genericFunc.getSubjects(function (err, subs) {
            if (err) throw err;
            else {
                var sub = [],
                    candidate = [],
                    task = [];
                var no_of_inserted_rec = 0,
                    no_of_not_inserted_rec = 0;
                //console.log(subs);
                async.each(subs, function (item, call) {
                    sub.push(item.id);
                    call();
                }, function (err) {
                    /*Get All Users From Database*/
                    genericFunc.getUsers(function (err, user) {
                        if (err) throw err;
                        else {
                            if (user.length) {

                                async.each(user, function (item1, call1) {
                                    candidate.push(item1.id);
                                    call1();
                                }, function (err) {
                                    resultData.forEach(function (item2) {
                                        if ((candidate.indexOf(parseInt(item2[0])) > -1) === true && (sub.indexOf(parseInt(item2[1])) > -1) === true) {
                                            no_of_inserted_rec = no_of_inserted_rec + 1;
                                            task.push(function (callback) {
                                            	var obj = {
											        subject_id: item2[0],
											        mark_obtained: item2[2],
											        student_id: item2[1]
											    };
                                                genericFunc.insertIntoDB(obj,'result', function (err, state) {
                                                    if (err) callback();
                                                    else callback();
                                                });
                                            });
                                        } else {
                                            no_of_not_inserted_rec = no_of_not_inserted_rec + 1;
                                        }
                                    });
                                });
                                async.parallel(task, function (err, result) {
                                    if (err) res.send({
                                        status: 'fail'
                                    });
                                    else {
                                        fs.unlink(__dirname + '/../public/uploads/' + req.files.file.name, function (err) {
                                            if (err) return console.error(err)
                                            console.log("Records inserted successfully");
                                            console.log("inserted records : " + no_of_inserted_rec);
                                            console.log("not inserted records : " + no_of_not_inserted_rec);
                                            res.send({
                                                status: 'success',
                                                inserted_rec: no_of_inserted_rec,
                                                not_inserted_rec: no_of_not_inserted_rec
                                            });
                                        });
                                    }
                                });
                            } else {
                                fs.unlink(__dirname + '/../public/uploads/' + req.files.file.name, function (err) {
                                    if (err) throw err;
                                    console.log("No Records inserted");
                                    res.send("No Records inserted");
                                });
                            }
                        }
                    })
                });
            }
        });
        //console.log(resultData);
    });
});
module.exports = router;