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
	connection.query("select * from student_info s, account a where s.account_id=a.id and enabled='1' and a.user_type_uid=1",function(err,docs){
		if(err) throw err;
		else
        {
            //console.log(docs);
            res.send(docs);
        }
	});
});
router.get("/:id",function(req,res){
    //console.log("********************");
	connection.query("select * from student_info s, account ac,address a, organization o where s.account_id=ac.id and ac.address_uid=a.address_uid and ac.orgid=o.orgid and ac.id='"+req.params.id+"' and ac.user_type_uid=1 and enabled='1'",function(err,docs){
		if(err) throw err;
		else
        {
            //console.log(docs);
            res.send(docs[0]);
        } 
	});
});
router.post("/", function (req, res) {
    //console.log(req.files.file);
    fs.readFile(__dirname + '/../public/uploads/' + req.files.file.name, 'utf8', function (err, data) {
        if (err) throw err;
        else {
            if (data.length) {
                //console.log(data);
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
                    console.log(new Date(obj.date_of_birth));
                    task.push(function (callback) {
                        if (obj.first_name && obj.work_email && obj.user_id && obj.org_code && obj.class && obj.section) {
                            connection.query("select * from organization where ORG_CODE ='" + obj.org_code + "'", function (err, org) {
                                if (err) throw err;
                                else {
                                    if (org.length) {
                                        //console.log(org)
                                        connection.query("select * from account where user_id='" + obj.user_id + "'", function (err, rec) {
                                            if (err) {
                                                //console.log(err);
                                                throw err;
                                            } else {
                                                if (rec.length) {
                                                    no_of_not_inserted_rec++;
                                                    Status.push("User ID Already Exist");
                                                    callback();
                                                } else {
                                                    var addr_obj = {
                                                        address_1: obj.address_1,
                                                        address_2: obj.address_2,
                                                        address_city: obj.address_city,
                                                        address_state: obj.address_state,
                                                        address_zipcode: obj.address_zipcode,
                                                        address_country: obj.address_country
                                                    };
                                                    genericFunc.isAddress(addr_obj,function(err,addr){
                                                        if(err) throw err;
                                                        else if(addr.status === true){
                                                            var acc_obj = {
                                                                ORGID: req.body.org_id,
                                                                user_type_uid: obj.user_type_uid,
                                                                address_uid: addr.address_uid,
                                                                USER_ID: obj.user_id,
                                                                PASSWORD: obj.password,
                                                                home_email: obj.home_email,
                                                                enabled:'1',
                                                                first_name: obj.first_name,
                                                                middle_name: obj.middle_name,
                                                                last_name: obj.last_name,
                                                                image_path: obj.image_path,
                                                                gender: obj.gender,
                                                                date_of_birth: new Date(obj.date_of_birth),
                                                                phone_number: obj.phone_number,
                                                                work_email: obj.work_email,
                                                                emergency_contact_number: obj.emergency_contact_number,
                                                                blood_group: obj.blood_group,
                                                                created_by: req.body.aid

                                                            };
                                                            genericFunc.insertIntoDB(acc_obj, 'account', function (err, state1) {
                                                                if (err) {
                                                                    no_of_not_inserted_rec++;
                                                                    Status.push(err);
                                                                    console.log("account error!!!!!!!!!!!");
                                                                    callback();
                                                                } else {
                                                                    var stud_obj = {
                                                                        account_id: state1.insertId,
                                                                        class: obj.class,
                                                                        section: obj.section,
                                                                        roll_number: obj.roll_number,
                                                                        bus_route_number: obj.bus_route_number,
                                                                        mother_name: obj.mother_name,
                                                                        mother_email: obj.mother_email,
                                                                        mother_phone: obj.mother_phone,
                                                                        mother_occupation: obj.mother_occupation,
                                                                        father_name: obj.father_name,
                                                                        father_email: obj.father_email,
                                                                        father_phone: obj.father_phone,
                                                                        father_occupation: obj.father_occupation
                                                                    };
                                                                    genericFunc.insertIntoDB(stud_obj, 'student_info', function (err, state1) {
                                                                        if (err) {
                                                                            no_of_not_inserted_rec++;
                                                                            Status.push(err);
                                                                            callback();
                                                                            console.log("student_info error!!!!!!!!!!!");
                                                                        } else {
                                                                            no_of_inserted_rec++;
                                                                            callback();
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        else{
                                                            genericFunc.insertIntoDB(addr_obj,'address',function(err,state){
                                                                if(err) throw err;
                                                                else{
                                                                    var acc_obj = {
                                                                        ORGID: req.body.org_id,
                                                                        user_type_uid: obj.user_type_uid,
                                                                        address_uid: state.insertId,
                                                                        USER_ID: obj.user_id,
                                                                        PASSWORD: obj.password,
                                                                        home_email: obj.home_email,
                                                                        enabled:'1',
                                                                        first_name: obj.first_name,
                                                                        middle_name: obj.middle_name,
                                                                        last_name: obj.last_name,
                                                                        image_path: obj.image_path,
                                                                        gender: obj.gender,
                                                                        date_of_birth: new Date(obj.date_of_birth),
                                                                        phone_number: obj.phone_number,
                                                                        work_email: obj.work_email,
                                                                        emergency_contact_number: obj.emergency_contact_number,
                                                                        blood_group: obj.blood_group,
                                                                        created_by: req.body.aid

                                                                    };
                                                                    genericFunc.insertIntoDB(acc_obj, 'account', function (err, state1) {
                                                                        if (err) {
                                                                            no_of_not_inserted_rec++;
                                                                            Status.push(err);
                                                                            console.log("account error!!!!!!!!!!!");
                                                                            callback();
                                                                        } else {
                                                                            var stud_obj = {
                                                                                account_id: state1.insertId,
                                                                                class: obj.class,
                                                                                section: obj.section,
                                                                                roll_number: obj.roll_number,
                                                                                bus_route_number: obj.bus_route_number,
                                                                                mother_name: obj.mother_name,
                                                                                mother_email: obj.mother_email,
                                                                                mother_phone: obj.mother_phone,
                                                                                mother_occupation: obj.mother_occupation,
                                                                                father_name: obj.father_name,
                                                                                father_email: obj.father_email,
                                                                                father_phone: obj.father_phone,
                                                                                father_occupation: obj.father_occupation
                                                                            };
                                                                            genericFunc.insertIntoDB(stud_obj, 'student_info', function (err, state1) {
                                                                                if (err) {
                                                                                    no_of_not_inserted_rec++;
                                                                                    Status.push(err);
                                                                                    console.log("student_info error!!!!!!!!!!!");
                                                                                    callback();
                                                                                } else {
                                                                                    no_of_inserted_rec++;
                                                                                    callback();
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    } else {
                                        no_of_not_inserted_rec++;
                                        Status.push("School code is not valid");
                                        callback();
                                    }
                                }
                            });

                        } else {
                            no_of_not_inserted_rec++;
                            Status.push('Some fields should not be empty');
                            callback();
                        }
                    });
                });
                async.parallel(task, function (err, result) {
                    if (err) res.send({
                        status: false
                    });
                    else {
                        fs.unlink(__dirname + '/../public/uploads/' + req.files.file.name, function (err) {
                            if (err) return console.error(err)
                            console.log("Records inserted successfully");
                            console.log("records inserted : " + no_of_inserted_rec);
                            console.log("records rejected : " + no_of_not_inserted_rec);
                            console.log("records rejected status" + JSON.stringify(Status));
                            res.send({
                                status: true,
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
});
router.put("/",function(req,res){
    var Status=[];
    console.log(JSON.parse(req.body.stud));
    var obj = JSON.parse(req.body.stud);
    //console.log(req.files);
    connection.query("select * from organization where ORG_CODE ='" + obj.ORG_CODE + "'", function (err, org) {
        if (err) throw err;
        else {
            if (org.length) {
                //console.log(org)
                connection.query("select * from account where user_id='" + obj.USER_ID + "'", function (err, rec) {
                    if (err) {
                        //console.log(err);
                        throw err;
                    } else {
                        if (rec.length) {
                            var addr_obj = {
                                address_1: obj.address_1,
                                address_2: obj.address_2,
                                address_city: obj.address_city,
                                address_state: obj.address_state,
                                address_zipcode: obj.address_zipcode,
                                address_country: obj.address_country
                            };
                            genericFunc.isAddress(addr_obj,function(err,addr){
                                if(err) throw err;
                                else if(addr.status === true){
                                    var acc_obj = {
                                        ORGID: obj.ORGID,
                                        user_type_uid: obj.user_type_uid,
                                        address_uid: addr.address_uid,
                                        USER_ID: obj.USER_ID,
                                        PASSWORD: obj.PASSWORD,
                                        home_email: obj.home_email,
                                        enabled:'1',
                                        first_name: obj.first_name,
                                        middle_name: obj.middle_name,
                                        last_name: obj.last_name,
                                        gender: obj.gender,
                                        date_of_birth: new Date(obj.date_of_birth),
                                        phone_number: obj.phone_number,
                                        work_email: obj.work_email,
                                        emergency_contact_number: obj.emergency_contact_number,
                                        blood_group: obj.blood_group,
                                        created_by: obj.created_by
                                    };
                                   if(req.files[0] !== undefined)
                                    {
                                        console.log("**********");
                                        acc_obj.image_path = req.files[0].name;
                                    }
                                    //console.log(acc_obj);
                                    genericFunc.updateIntoADB(acc_obj,obj.ID, 'account', function (err, state1) {
                                        if (err) {
                                            Status.push(err);
                                            console.log("account error!!!!!!!!!!!");
                                             res.send({status:false,Status:Status});
                                        } else {
                                            var stud_obj = {
                                                account_id: obj.ID,
                                                class: obj.class,
                                                section: obj.section,
                                                roll_number: obj.roll_number,
                                                bus_route_number: obj.bus_route_number,
                                                mother_name: obj.mother_name,
                                                mother_email: obj.mother_email,
                                                mother_phone: obj.mother_phone,
                                                mother_occupation: obj.mother_occupation,
                                                father_name: obj.father_name,
                                                father_email: obj.father_email,
                                                father_phone: obj.father_phone,
                                                father_occupation: obj.father_occupation
                                            };
                                            genericFunc.updateIntoSDB(stud_obj,obj.ID, 'student_info', function (err, state1) {
                                                if (err) {
                                                    Status.push(err);
                                                    console.log("student_info error!!!!!!!!!!!");
                                                     res.send({status:false,Status:Status});
                                                } else {
                                                     res.send({status:true});
                                                }
                                            });
                                        }
                                    });
                                }
                                else{
                                    genericFunc.insertIntoDB(addr_obj,'address',function(err,state){
                                        if(err) throw err;
                                        else{
                                            var acc_obj = {
                                                ORGID: obj.ORGID,
                                                user_type_uid: obj.user_type_uid,
                                                address_uid: state.insertId,
                                                USER_ID: obj.USER_ID,
                                                PASSWORD: obj.PASSWORD,
                                                home_email: obj.home_email,
                                                enabled:'1',
                                                first_name: obj.first_name,
                                                middle_name: obj.middle_name,
                                                last_name: obj.last_name,
                                                gender: obj.gender,
                                                date_of_birth: new Date(obj.date_of_birth),
                                                phone_number: obj.phone_number,
                                                work_email: obj.work_email,
                                                emergency_contact_number: obj.emergency_contact_number,
                                                blood_group: obj.blood_group,
                                                created_by: obj.created_by
                                            };
                                            if(req.files[0]!== undefined)
                                            {
                                                console.log("**********");
                                                acc_obj.image_path = req.files[0].name;
                                            }
                                            //console.log(acc_obj);
                                            genericFunc.updateIntoADB(acc_obj,obj.ID, 'account', function (err, state1) {
                                                if (err) {
                                                    Status.push(err);
                                                    console.log("account error!!!!!!!!!!!");
                                                     res.send({status:false,Status:Status});
                                                } else {
                                                    var stud_obj = {
                                                        account_id: obj.account_id,
                                                        class: obj.class,
                                                        section: obj.section,
                                                        roll_number: obj.roll_number,
                                                        bus_route_number: obj.bus_route_number,
                                                        mother_name: obj.mother_name,
                                                        mother_email: obj.mother_email,
                                                        mother_phone: obj.mother_phone,
                                                        mother_occupation: obj.mother_occupation,
                                                        father_name: obj.father_name,
                                                        father_email: obj.father_email,
                                                        father_phone: obj.father_phone,
                                                        father_occupation: obj.father_occupation
                                                    };
                                                    genericFunc.updateIntoSDB(stud_obj,obj.ID, 'student_info', function (err, state1) {
                                                        if (err) {
                                                            Status.push(err);
                                                            console.log("student_info error!!!!!!!!!!!");
                                                             res.send({status:false,Status:Status});
                                                        } else {
                                                             res.send({status:true});
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            Status.push("User ID not Exist");
                            res.send({status:false,Status:Status});                   
                        }
                    }
                });
            } else {
                Status.push("School code is not valid");
                 res.send({status:false,Status:Status});
            }
        }
    });
});
router.delete("/:id",function(req,res){
	connection.query("update account set enabled='0' where id='"+req.params.id+"'",function(err,state){
		if(err) throw err;
		else {
			console.log("Student Record Deleted!!!");
			res.send({status:true});
		}
	});
});
module.exports = router;