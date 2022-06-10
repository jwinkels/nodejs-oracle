const oracledb = require('oracledb');

//ESTABLISH A CONNECTION TO DATABASE
oracledb.getConnection({
    user: "THGM",
    password: 'LG$_rhRF4mE3um',
    connectString: "192.168.99.101/XEPDB1"
}).then(function(connection){
    //WHEN A CONNECTION IS ESTABLISHED PERFORM A SELECT AND PRINT RESULTS TO CONSOLE
    if (connection){
        connection.execute("select * from EMPLOYEES").then(function(result){
            console.log(result);
        });
    }
}).catch(function(error){
    console.log(error.message);
});
