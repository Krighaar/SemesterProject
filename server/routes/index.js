var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var http = require('http');

//var passwordHash = require('password-hash');


/* GET home page. */
router.get('/', function (req, res) {
    res.redirect("app/index.html")
});
router.post('/createUser', function (req, res) {
    // console.log("req.body " + JSON.stringify(req.body))
    req.body.role = "user";

    //console.log("putreq.body " + JSON.stringify(req.body))
    var result = require('crypto').createHash('sha256').update(req.body.pw, "utf8").digest('hex')
    // console.log(result); //d7I986+YD1z
    req.body.pw = result;


    require('crypto').randomBytes(16, function (ex, buf) {
        if (ex) throw ex;
        console.log(buf.toString("hex"));
    });

    var post_options = {
        host: 'sunnycop.cloudapp.net',
        port: '9876',
        path: '/user',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');

        res.on('data', function (chunk) {

            console.log('Response: ' + chunk);


        });
        res.on('error', function (err) {
            console(err.message)

            ;
        });
    });

    // post the data
    post_req.write(JSON.stringify(req.body));
    post_req.end();

})

router.put('/editUser', function (req, res) {
    // console.log("putreq.body " + JSON.stringify(req.body))
    var result = require('crypto').createHash('sha256').update(req.body.pw, "utf8").digest('hex')
    // console.log(result); //d7I986+YD1z
    req.body.pw = result;

    var put_options = {
        host: 'sunnycop.cloudapp.net',
        port: '9876',
        path: '/user',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    var put_req = http.request(put_options, function (res) {
        res.setEncoding('utf8');

        res.on('data', function (chunk) {

            console.log('Response: ' + chunk);


        });
        res.on('error', function (err) {
            console(err.message)

            ;
        });
    });

    // post the data
    put_req.write(JSON.stringify(req.body));
    put_req.end();

})


router.delete('/deleteUser', function (req, res) {
    //  console.log("req.body " + JSON.stringify(req.body))

    var delete_options = {
        host: 'sunnycop.cloudapp.net',
        port: '9876',
        path: '/user',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    var delete_req = http.request(delete_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);


        });
        res.on('error', function (err) {
            cosole(err.message)
        });
    });

    // post the data
    delete_req.write(JSON.stringify(req.body));
    delete_req.end();

})


router.post('/authenticate', function (req, resp) {
    var role
    var response;
    //TODO: Go and get UserName Password from "somewhere"
    //if is invalid, return 401
    // if (req.body.username === 'student' && req.body.password === 'test') {

    var result = require('crypto').createHash('sha256').update(req.body.pw, "utf8").digest('hex')
    //console.log(result); //d7I986+YD1z
    req.body.pw = result;


    var post_options = {
        host: 'sunnycop.cloudapp.net',
        port: '9876',
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        }
    };

    // Set up the request
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            findRole(chunk);

        });
        res.on('error', function (err) {
            console(err.message)
        });
    });
    //console.log("loggingin body " + JSON.stringify(req.body))
    // post the data
    post_req.write(JSON.stringify(req.body));
    post_req.end();

//})


    function findRole(chunk) {
        switch (parseInt(chunk)) {
            case 0:
                role = null;
                break;
            case 1:
                role = "admin";
                break;
            case 2:
                role = "user";
                break;
            default:
                role = null;
        }
        // console.log(role)

        setRoles(role)
    }


    function setRoles(role) {
        var profile = {
            username: req.body.userName,
            role: role
        };


        if (role === 'user') {
            // console.log('inside userToken')
            // We are sending the profile inside the token
            var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
            resp.json({token: token});
            return;
        } else if (role === 'admin') {
            //console.log('inside AdminToken')
            // We are sending the profile inside the token
            var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, {expiresInMinutes: 60 * 5});
            resp.json({token: token});
            return;
        }
        else {

            resp.status(401).send('Wrong user or password');
            return;
        }
    }

});


//Get Partials made as Views
router.get('/partials/:partialName', function (req, res) {
    var name = req.params.partialName;
    res.render('partials/' + name);
});


module.exports = router;
