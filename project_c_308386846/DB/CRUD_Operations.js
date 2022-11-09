const sql = require("./db");
const haversine = require('haversine-distance')
var LoggedUsers = [];

const createNewUser = function (req, res) {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const newUser = {
        "email": req.body.email,
        "fullname": req.body.fullname,
        "password": req.body.password,
        "phone": req.body.phone,
        "gender": req.body.gender,
        "type": req.body.type,
        "experience": req.body.experience,
        "level": req.body.level,
        "text": req.body.text,
        "latitude": req.body.lat,
        "longitude": req.body.long
    };
    console.log(newUser);
    sql.query("INSERT INTO users SET ?", newUser, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating customer: " + err });
            return;
        }
        console.log("created customer: ", { id: mysqlres.insertId, ...newUser });
        res.redirect('/index');

    });
};

const loginUser = function (req, res) {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    var username = req.body.Username;
    var password = req.body.Password;
    var myUser = [];

    sql.query("select*from users where email = ? and password = ?", [username, password], function (err, results) {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating user: " + err });
            return;
        }
        for (i = 0; i < results.length; i++) {
            myUser.push(results[i]);   
        }
        if (results.length > 0) {
            LoggedUsers.unshift(results[0])
            console.log(LoggedUsers)
            res.render("profile", { myUser: LoggedUsers});
        } else {
            res.render("index", { user: results.length });
        }
        res.end();
    })
}

const updateLocation = function (req, res) { //update the user location in db
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    var locationUser = {

        "email": req.body.email,
        "latitude": req.body.lat,
        "longitude": req.body.long,
    };
    console.log(locationUser);
    let query = "UPDATE users set latitude = ?, longitude = ? WHERE email = ?";
    let data = [locationUser.latitude, locationUser.longitude, locationUser.email];
    sql.query(query, data, (err, results, fields) => {
       
               if(err){
            console.log("error is: " +err)
            res.status(400).send({meesage: "rows effected" + err});
        return;
        }
        res.redirect("/profile")
    }//close query
    )}//updateLocation

const findMates = function (req, res) {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const userLoc = {

        "latitude": req.body.lat,
        "longitude": req.body.long
    };
    var userEmail = req.body.email
    var matesArr = [];
    const myLoc =[req.body.lat, req.body.long] 
    sql.query("select*from users ", function (err, results) {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating user: " + err });
            return;
        }
        for (i = 0; i < results.length; i++) {
var optMate = [results[i].latitude, results[i].longitude];
        if(haversine(myLoc,optMate)<4000){
            matesArr.push(results[i])
        }//if
    }//for

        res.render("card",{matesArr,userEmail});
    });
}//findmates func


module.exports = { createNewUser, loginUser, findMates,updateLocation,LoggedUsers}
