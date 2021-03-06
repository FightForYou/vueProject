const dbModel = require("./db_Model");

class GoodsModel extends dbModel {
	constructor() {
		super();
		this.table = "goods";
	}

    //获取所有商品信息
    getAllGoods(callback) {
        // select s.shopName,g.* from shop as s,goods as g where s.sid=g.sid
        let sql = `SELECT s.shopName,g.* FROM goods AS g INNER JOIN shop AS s ON g.sid = s.sid`;

        this.conn.query(sql, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                callback(result);
            }
        })
    }

    getAllInfo(gid, callback) {
        let sql = `select * from goods where gid = ${gid}`;       
		this.conn.query(sql, (err, results) => {
			if (err) {
				console.log(err);
			} else {
				callback(results);
			}
			this.close();
		})
	}
	//通过sid获取商品//
	getgoods(sid, callback) {
		let sql = `select * from ${this.table} where sid=? limit 0,4 `
		this.conn.query(sql, [sid], (err, result) => {
			if (err) {
				console.log(err)
				callback(err)
			} else {
				//   console.log(result)
				callback(result)
			}
			this.conn.end()
		})
	}


	// 本周热卖
	getbooks(gType, callback) {
		let sql = `select * from goods where gType = ${gType} LIMIT 0,8`
		this.conn.query(sql, (error, results) => {
			if (error) {
				console.log(error);
			} else {
				callback(results);
			}
		})
	}
	// 获取女装
	getwomens(gType, callback) {
		let sql = `select * from goods where gType = ${gType} LIMIT 0,8`
		
		this.conn.query(sql, (error, results) => {
			if (error) {
				console.log(error);
			} else {
				callback(results);
			}
		})
	}
	// 获取男装
	getmens(gType, callback) {
		let sql = `select * from goods where gType = ${gType} LIMIT 0,8`
		this.conn.query(sql, (error, results) => {
			if (error) {
				console.log(error);
			} else {
				callback(results);
			}
		})
	}
	// 获取汉元素
	chineses(gType, callback) {
		let sql = `select * from goods where gType = ${gType} LIMIT 0,8`
		this.conn.query(sql, (error, results) => {
			if (error) {
				console.log(error);
			} else {
				callback(results);
			}
		})
	}
	// 获取周边元素
	accessories(gType, callback) {
		let sql = `select * from goods where gType = ${gType} LIMIT 0,8`
		this.conn.query(sql, (error, results) => {
			if (error) {
				console.log(error);
			} else {
				callback(results);
			}
		})
	}

    //获取商品列表
    getgidlist(page,callback){
        page = (page-1)*10;
        let sql = `select gid from ${this.table} limit ${page},10`;
        this.conn.query(sql,(err,result)=>{
            if(err){
                console.log(err);
                callback(err);
            }else{
                console.log(result);
                callback(result);
            }
        })
    }
}

module.exports = GoodsModel;
