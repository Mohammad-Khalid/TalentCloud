var express = require('express');
var fs = require('fs');
var async = require('async');
var genericFunc = require('./genericFunc');
//console.log(genericFunc);
var parser = require('csv-parse/lib/sync');
var connection = require("./database");
var router = express.Router();
router.get("/", function (req, res) {
    connection.query("select * from organization o,address a where o.address_id=a.address_uid and active=1", function (err, org) {
        if (err) throw err;
        else {
            console.log(org);
            res.send(org);
        }
    });
});
router.get("/:Id", function (req, res) {
    connection.query("select * from organization o, address a where o.address_id=a.address_uid having ORGID='" + req.params.Id + "'", function (err, org) {
        if (err) throw err;
        else {
            //console.log(org);
            res.send(org);
        }
    });
});
router.get("/:Name", function (req, res) {
    connection.query("select * from organization o, address a where o.address_id=a.address_uid having ONAME='" + req.params.Name + "'", function (err, org) {
        if (err) throw err;
        else {
            console.log(org);
            res.send(org);
        }
    });
});
router.get("/:Code", function (req, res) {
    connection.query("select * from organization o, address a where o.address_id=a.address_uid having ORG_CODE='" + req.params.Code + "'", function (err, org) {
        if (err) throw err;
        else {
            console.log(org);
            res.send(org);
        }
    });
});
router.post("/", function (req, res) {
    console.log(req.body.org);
    genericFunc.isOrganization(req.body.org, function (err, org) {
        if (err) throw err;
        else {
            if (org.status === true) {
                res.send({
                    status: false
                });
            } else {
                var addr_obj = {
                    address_1: req.body.org.address.address_1,
                    address_2: req.body.org.address.address_2,
                    address_city: req.body.org.address.address_city,
                    address_state: req.body.org.address.address_state,
                    address_zipcode: req.body.org.address.address_zipcode,
                    address_country: req.body.org.address.address_country
                };
                genericFunc.isAddress(addr_obj, function (err, addr) {
                    if (err) throw err;
                    else {
                        if (addr.status === true) {

                        } else {
                            genericFunc.insertIntoDB(addr_obj, 'address', function (err, state) {
                                if (err) throw err;
                                else {
                                    delete req.body.org.address;
                                    console.log(req.body.org);
                                    var obj = {
                                        oname: req.body.org.oname,
                                        full_oname: req.body.org.full_oname,
                                        org_code: req.body.org.org_code,
                                        active: 1,
                                        comments: req.body.org.comments,
                                        address_id: state.insertId,
                                        primary_phone: req.body.org.primary_phone,
                                        secondary_phone: req.body.org.secondary_phone,
                                        email: req.body.org.email,
                                        created_by: req.body.org.aid
                                    };
                                    genericFunc.insertIntoDB(obj, 'organization', function (err, state1) {
                                        if (err) throw err;
                                        else {
                                            console.log("Organization Registered Successfully!!!!!");
                                            res.send({
                                                status: true
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});
router.put("/", function (req, res) {
    console.log(req.body);
    var addr_obj = {
        address_1: req.body.address.address_1,
        address_2: req.body.address.address_2,
        address_city: req.body.address.address_city,
        address_state: req.body.address.address_state,
        address_zipcode: req.body.address.address_zipcode,
        address_country: req.body.address.address_country
    };
    genericFunc.isAddress(addr_obj, function (err, addr) {
        if (err) throw err;
        else {
            if (addr.status === true) {
                console.log(addr);
                var obj = {
                    oname: req.body.oname,
                    full_oname: req.body.full_oname,
                    org_code: req.body.org_code,
                    active: 1,
                    comments: req.body.comments,
                    address_id: addr.address_uid,
                    primary_phone: req.body.primary_phone,
                    secondary_phone: req.body.secondary_phone,
                    email: req.body.email,
                    created_by: req.body.created_by
                };
                genericFunc.updateIntoDB(obj, req.body.org_id, 'organization', function (err, state) {
                    if (err) throw err;
                    else {
                        console.log("Updated!!!");
                        res.send({
                            status: true
                        });
                    }
                });
            } else {
                genericFunc.insertIntoDB(addr_obj, 'address', function (err, state) {
                    if (err) throw err;
                    else {
                        var obj = {
                            oname: req.body.oname,
                            full_oname: req.body.full_oname,
                            org_code: req.body.org_code,
                            active: 1,
                            comments: req.body.comments,
                            address_id: state.insertId,
                            primary_phone: req.body.primary_phone,
                            secondary_phone: req.body.secondary_phone,
                            email: req.body.email,
                            created_by: req.body.created_by
                        };
                        genericFunc.updateIntoDB(obj, req.body.org_id, 'organization', function (err, state1) {
                            if (err) throw err;
                            else {
                                console.log("Updated!!");
                                res.send({
                                    status: true
                                });
                            }
                        })
                    }
                });
            }
        }
    });
});
router.delete("/:Id", function (req, res) {
    connection.query("update organization set active=0 where orgid ='" + req.params.Id + "'", function (err, state) {
        if (err) throw err;
        else {
            console.log("Deleted!!!!");
            res.send({
                status: true
            });
        }
    });
})

module.exports = router;