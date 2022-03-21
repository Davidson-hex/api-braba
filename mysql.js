const mysql = require('mysql2');

const pool = mysql.createPool({
    "user" : "b32303513ff809",
    "password" : "0f06d652",
    "database" : "heroku_ac10ffaf7920ef8",
    "host" : "us-cdbr-east-05.cleardb.net",
    "port" : 3306
});


/*
mysql://b32303513ff809:0f06d652@us-cdbr-east-05.cleardb.net/heroku_ac10ffaf7920ef8?reconnect=true
*/
exports.exec = (query, params) => {
    return new Promise((resolve, reject) =>{
        pool.getConnection((error, conn) =>{
            if(error){
                reject(error);
            }else{
                conn.query(query, params, (error, result, fields) => {
                    conn.release();
                    if (error) {
                        reject(error);
                    }else{
                        resolve(result);
                    }
                });
            }
        });
    });
}

exports.pool = pool;