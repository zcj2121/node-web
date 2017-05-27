var mysql = require("mysql");
var pool = mysql.createPool({
    host: '59.110.238.148',     
     user: 'root',   
     password: 'zcj2121520',  
     database:'myuser', // 前面建的user表位于这个数据库中 
      port: 3306  
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;