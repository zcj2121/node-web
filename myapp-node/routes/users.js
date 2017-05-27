var express = require('express');
var router = express.Router();

var db = require("../config/db");

router.all('*', function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "X-Requested-With");
 res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
 res.header("X-Powered-By",' 3.2.1');
 res.header("Content-Type", "application/json;charset=utf-8");
 next();
});
/**
 * 查询列表页
 */
router.get("/",function(req,res,next){
    db.query("select * from tuser",function(err,rows){
        if(err){
            res.send(err);
        }else {
            res.send(rows);
        }
    });
});

/**
 * 添加用户
 */

/*router.get("/add",function(req,res,next){
    res.render("add");
});*/
router.post("/add",function(req,res,next){
    var name = req.body.name;
    var password = req.body.password;
    db.query("insert into tuser(name,password) values('"+name+"','"+ password +"')",function(err,rows){
        if(rows) {      
             
		rows = {   
                      
		code: 200,   
                     
		msg:'增加成功'
             
		}; 
	 
        
	}   

       
       
	 res.send(rows);
    });
});

/**
 * 删除用户
 */
router.get("/del/:id",function(req,res){
    var id = req.params.id;
    db.query("delete from tuser where id = " + id,function(err,rows){
        if(rows) {      
             
		rows = {   
                      
		code: 200,   
                     
		msg:'删除成功'
             
		}; 
	 
        
	}   

       
       
	 res.send(rows);
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res,next){
    var id = req.params.id;
    var sql = "select * from tuser where id = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改页面跳转失败");
        }else {
            res.send(rows);
        }
    });
});

router.post("/update",function(req,res,next){
    var id = req.body.id;
    var name = req.body.name;
    var password = req.body.password;
    var sql = "update tuser set name = '"+ name +"',password = '"+ password +"' where id = " + id;
    console.log(sql);
    db.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.send(rows);
        }
    });
});


/**
 * 查询
 */
router.post("/search",function(req,res,next){
    var name = req.body.s_name;
    var password = req.body.s_password;
    var sql = "select * from tuser";
    if(name){
        sql += " where name = '"+ name +"'";
    }
    //if(password){
    //    sql += " and password = '" + password + "'";
    //}

    sql.replace("and","where");
    db.query(sql,function(err,rows){
        if(err){
            res.send("查询失败: "+err);
        }else{
            res.send(rows);
        }
    });
})

module.exports = router;