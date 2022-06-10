const oracledb = require('oracledb');
try{
    //ESTABLISH CONNECTION
    oracledb.getConnection({
        user: "THGM",
        password: 'LG$_rhRF4mE3um',
        connectString: "192.168.99.101/XEPDB1"
    }).then(function(connection){
        if (connection){
            //WHEN CONNECTION IS ESTABLISHED PRINT JOHN MCCLANE
            console.log('Yipijayeah, Schweinebacke!');
        }
    });
    
}catch(err){
    console.log(err);
}
