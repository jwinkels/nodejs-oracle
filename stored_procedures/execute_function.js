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
            if (connection){
                //WHEN CONNECTION IS ESTABLISHED EXECUTE FUNCTION 
                connection.execute(`BEGIN
                    :employee_id:=insert_emp(first_name=>:fn, last_name=>:ln, email=>:email, job_id=>:job);
                END;`,
                                    {
                                        employee_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER}, //OUT_BIND 
                                        fn:{val: req.body.first_name, type: oracledb.STRING},
                                        ln:{val: req.body.last_name, type: oracledb.STRING},
                                        email:{val:req.body.email, type: oracledb.STRING},
                                        //hire:{val:date,type: oracledb.DATE},
                                        job:{val:'SA_REP',type:oracledb.STRING}
                                    }, {
                                        autoCommit: true
                                        })
                    .then(function(result){
                        connection.close();
                        res.send(result.outBinds);
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

//API ENDPOINT FOR HTTP (GET)- CALLS
app.get('/emp', function (req, res) {
    try{
        //ESTABLISH CONNECTION
        oracledb.getConnection({
            user: "THGM",
            password: 'LG$_rhRF4mE3um',
            connectString: "192.168.99.101/XEPDB1"
        }).then(function(connection){
            if (connection){
                var id=0;

                if (req.query.id){
                    id=req.query.id;
                }
                //QUERY EMPLOYEE WITH ID 
                connection.execute(`select EMPLOYEE_ID, FIRST_NAME, LAST_NAME 
                                        from EMPLOYEES 
                                        where employee_id=to_number(:emp_id)`
                                    ,{
                                        emp_id:{val: parseInt(id), type: oracledb.NUMBER},
                                    },
                                    { outFormat: oracledb.OUT_FORMAT_OBJECT }
                                    ).then(function(result){
                                                res.send(result.rows);
                                                connection.close();
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
