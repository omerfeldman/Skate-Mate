var SQL = require('./db');
const path = require('path');
const csv = require('csvtojson');
const csv1 = require('csv');



const CreateTable = (req, res) => {
    var Q1 = "CREATE TABLE users (id INT, email VARCHAR(255), fullname VARCHAR(255), password VARCHAR(255), phone VARCHAR(255),  gender VARCHAR(255), type VARCHAR(255), experience VARCHAR(255), level INT, text VARCHAR(255), latitude VARCHAR(255), longitude VARCHAR(255))";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })
}

const InsertMyData = (req, res) => {
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath = path.join(__dirname, "data1.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var NewEntry = {
                    "id": element.id,
                    "email": element.email,
                    "fullname": element.fullname,
                    "password": element.password,
                    "phone": element.phone,
                    "gender": element.gender,
                    "type": element.type,
                    "experience": element.experience,
                    "level": element.level,
                    "text": element.text,
                    "latitude": element.latitude,
                    "longitude": element.longitude
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        })
    res.send("data read");
};

const ShowTable = (req, res) => {
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres) => {
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })
};

const DropTable = (req, res) => {
    var Q4 = "DROP TABLE users";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error om dropping table" + err });
            return;
        }
        console.log("table drpped");
        res.send("table dropped");
        return;
    })
}


module.exports = { CreateTable, InsertMyData, ShowTable, DropTable };