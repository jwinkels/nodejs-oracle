const oracledb = require('oracledb');
var express = require('express');
var app = express();
//var bodyParser = require('body-parser');    //BODY PARSER NEEDED TO READ HTTP-BODY PAYLOADS
//var jsonParser = bodyParser.json();         //BODY PARSER FOR JSON 
var date = new Date();

app.use(express.json());

//API ENDPOINT FOR HTTP (POST)- CALLS
app.post('/emp', express.json(), function (req, res) {
    try{
        //ESTABLISH CONNECTION
        oracledb.getConnection({
            user: "THGM",
            password: 'LG$_rhRF4mE3um',
            connectString: "192.168.99.101/XEPDB1"
        }).then(function(connection){
            //WHEN CONNECTION IS ESTABLISHED
            if (connection){
                //GET NEXT ID VALUE FOR PRIMARY KEY
                connection.execute('select EMPLOYEES_SEQ.NEXTVAL from dual')
                    .then(function(rsId){
                        
                        //INSERT NEW DATA INTO TABLE AND DETAIL BIND
                        connection.execute("insert into employees(employee_id, first_name, last_name, email, hire_date, job_id) values(:id, :fn, :ln, :email, :hire, :job)",
                                            {
                                                id:{val: rsId.rows[0][0], type: oracledb.NUMBER},
                                                fn:{val: req.body.first_name, type: oracledb.STRING},
                                                ln:{val: req.body.last_name, type: oracledb.STRING},
                                                email:{val:req.body.email, type: oracledb.STRING},
                                                hire:{val:date,type: oracledb.DATE},
                                                job:{val:'SA_REP',type:oracledb.STRING}
                                            }, {
                                                autoCommit: true
                                              })
                            .then(function(result){
                                //WHEN INSERT WAS SUCCESSFUL SEND POSITIVE FEEDBACK
                                connection.close();
                                res.send();
                            })
                            .catch(function(error){
                                //WHEN INSERT FAILS SEND 'UNAUTHORIZED'-ERROR AND DELIVER ERROR MESSAGE
                                res.status(401);
                                res.send(error.message);
                            });
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
