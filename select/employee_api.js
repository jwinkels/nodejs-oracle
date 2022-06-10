const oracledb = require('oracledb');
var express = require('express');
var app = express();

//API ENDPOINT FOR HTTP (GET)- CALLS
app.get('/emp', function (req, res) {
    try{
        //ESTABLISH CONNECTION
        oracledb.getConnection({
            user: "THGM",
            password: 'LG$_rhRF4mE3um',
            connectString: "192.168.99.101/XEPDB1"
        }).then(function(connection){
            //WHEN A CONNECTION IS ESTABLISHED
            if (connection){

                var salary=0;
                //WHEN REQUEST CONTAINS A "SALARY" VALUE 
                if (req.query.sal){
                    salary=req.query.sal;
                }

                //PERFORM SELECT AGAINST DATABASE WITH SIMPLE BIND VARIABLE
                connection.execute("select EMPLOYEE_ID, FIRST_NAME, LAST_NAME from EMPLOYEES where SALARY >= :salary or :salary IS NULL"
                                    ,[salary]
                                    ,{ outFormat: oracledb.OUT_FORMAT_OBJECT }  //GET PRETTY JSON RESULT
                                    ).then(function(result){
                    res.send(result.rows);
                    connection.close();
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
