var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require("./routes/user");
var multer = require("multer");
var result = require('./routes/result');
var admin = require('./routes/admin');
var student = require('./routes/student');
var teacher = require('./routes/teacher');
var organization = require('./routes/organization');
var mysql = require('mysql');
var cors = require('cors');
var port = process.env.port || 3000;
var app = module.exports = express();
app.use(bodyParser.raw({limit: "300mb"}));
app.use(bodyParser.text({limit: "300mb"}));
app.use(bodyParser.json({limit: "300mb"}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'shhhh, very secret'
}));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(multer({
    dest: './public/uploads/',
    rename: function (fieldname, filename) {
        return filename;
    }
}));
app.post("/login", user.login);
app.get('/', function (req, res) {
    res.sendFile('public/registration.html', {
        "root": "."
    });
})
app.use("/result", result);
app.use("/organization",organization);
app.use("/student",student);
app.use("/teacher",teacher);
app.post("/adminLogin", admin.adminLogin);


app.use(function (req, res, next) {
    res.status(404).send("NOT FOUND");
});

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        // req.session.error = 'Access denied!';
        res.redirect('/');
    }
}

app.listen(port, function (req, res) {
    console.log("Server is running at port " + port);
});