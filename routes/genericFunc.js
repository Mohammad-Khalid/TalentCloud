(function () {
    var connection = require('./database');
    var genF = {};
    genF.getSubjects = function (callback) {
        connection.query("select id from subjects", function (err, subs) {
            if (err) return callback(err);
            else return callback(null, subs);
        });
    };
    genF.getUsers = function (callback) {
        connection.query("select id from users", function (err, user) {
            if (err) return callback(err);
            else return callback(null, user);
        });
    };
    genF.insertIntoDB = function (obj, tbNm, callback) {
        //console.log(tbNm);
        console.log("**************");
        console.log(obj);
        console.log("**************");
        connection.query("insert into " + tbNm + " set ?", obj, function (err, state) {
            if (err) return callback(err);
            else return callback(null, state);
        });
    };
    genF.isAddress = function (addr, callback) {

        connection.query("select * from address where address_1='" + addr.address_1 + "' and address_2='" + addr.address_2 + "' and address_city='" + addr.address_city + "' and address_zipcode='" + addr.address_zipcode + "' and address_state='" + addr.address_state + "' and address_country='" + addr.address_country + "'", function (err, address) {
            if (err) return callback(err);
            else {
                if (address.length) {
                    //console.log(address[0]);
                    return callback(null, {
                        status: true,
                        address_uid: address[0].address_uid
                    });
                } else
                    return callback(null, {
                        status: false
                    });
            }
        });
    };
    genF.isOrganization = function (org, callback) {
        connection.query("select * from organization where oname='" +org.oname + "' and org_code ='" + org.org_code + "'", function (err, org) {
            if (err) return callback(err);
            else {
                if (org.length) return callback(null, {
                    status: true
                });
                else return callback(null, {
                    status: false
                });
            }
        });
    };
    genF.updateIntoDB = function (obj, id,tbNm, callback) {
        console.log(obj);
        connection.query("update "+tbNm+" set ? where orgid='" + id + "'", obj, function (err, state) {
            if (err) return callback(err);
            else return callback(null, {
                status: true
            });
        });
    };
    genF.updateIntoADB = function (obj, id,tbNm, callback) {
        console.log(obj);
        connection.query("update "+tbNm+" set ? where ID='" + id + "'", obj, function (err, state) {
            if (err) return callback(err);
            else return callback(null, {
                status: true
            });
        });
    };
    genF.updateIntoSDB = function (obj, id,tbNm, callback) {
        console.log(obj);
        connection.query("update "+tbNm+" set ? where account_id='" + id + "'", obj, function (err, state) {
            if (err) return callback(err);
            else return callback(null, {
                status: true
            });
        });
    };
    
    if (typeof module === 'object' && module.exports) {
        module.exports = genF;
    }
}());