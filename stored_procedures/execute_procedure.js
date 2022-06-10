const oracledb = require('oracledb');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');    //BODY PARSER NEEDED TO READ HTTP-BODY PAYLOADS
var jsonParser = bodyParser.json();         //BODY PARSER FOR JSON     
var date = new Date();

//API ENDPOINT FOR HTTP (POST)- CALLS
app.post('/emp', jsonParser, function (req, res) {
    try{
        //ESTABLISH CONNECTION
        oracledb.getConnection({
            user: "THGM",
            password: 'LG$_rhRF4mE3um',
            connectString: "192.168.99.101/XEPDB1"
        }).then(function(connection){
            //WHEN CONNECTION IS ESTABLISHED
            if (connection){
                        //CALL PROCEDURE TO INSERT DATA AND DETAIL BINDS
                        connection.execute(`BEGIN
                            insert_employee(first_name=>:fn, last_name=>:ln, email=>:email, job_id=>:job);
                        END;`,
                                            {
                                                fn:{val: req.body.first_name, type: oracledb.STRING},
                                                ln:{val: req.body.last_name, type: oracledb.STRING},
                                                email:{val:req.body.email, type: oracledb.STRING},
                                                //hire:{val:date,type: oracledb.DATE},
                                                job:{val:'SA_REP',type:oracledb.STRING}
                                            }, {
                                                autoCommit: true
                                              })
                            .then(function(result){
                                //WHEN PROCEDURE WAS SUCCESFULL SEND POSITIVE FEEDBACK
                                connection.close();
                                res.send();
                            })
                            .catch(function(error){
                                res.status(401);
                                res.send(error.message);
                            });
            }
        });
        
    }catch(err){
        console.log(err);
    }
    
});

app.listen(3000, function () {
  console.log('Employee API listening on port 3000!');
});
