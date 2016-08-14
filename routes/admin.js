var connection = require("./database");
exports.adminLogin = function (req, res) {
    console.log(req.body);
    connection.query("select * from admin_account where user_name='" + req.body.email + "' and password='" + req.body.password + "'", function (err, adm) {
        if (err) throw err;
        else {
            if (adm.length) {
                adm[0].user_type = 0;
                req.session.admin = adm[0];

                console.log(adm[0]);
                res.send({
                    status: true,
                    user: adm[0]
                });
            } else {
                res.send({
                    status: false,
                    error: 'Invalid Username, Password'
                });
            }
        }
    });
}