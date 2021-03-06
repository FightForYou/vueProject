const express = require('express');
const router = express.Router();
const GoodsModel = require("../Model/goods_Model");
const ShopModel = require("../Model/shop_Model");
const multer = require("multer"); //图片模块

//上传的图片存储，destination上传的路径,filename文件命名
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + "/../goodsPhoto/")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage: storage });

router.post("/Photo", upload.single("file"), (req, res) => {
    let hostUrl = "http://localhost:8888/goodsPhoto/";
    let adress = hostUrl + req.file.filename;
    res.json({ adress });
})

//商品添加
router.post("/add", (req, res) => {
    let shopModel = new ShopModel();
    shopModel.addGoods(req.body, (results) => {
        let re = {
            code: 1
        }
        if (!results.affectedRows) {
            re = { code: -1 }
        }
        res.json(re);
    })
})

//商品删除
router.post("/del", (req, res) => {
    let shopModel = new ShopModel();
    shopModel.delGoods(req.body.shopId, req.body.goodsId, (result) => {
        let re = {
            code: 1
        }
        if (!result.affectedRows) {
            re = { code: -1 }
        }
        res.json(re);
    })
})


//获取一个商品的信息
router.post("/getGoods", (req, res) => {
    let shopModel = new ShopModel();
    shopModel.getGoods(req.body.goodsId, (result) => {
        res.json(result);
    })
})


router.post("/sdbdoods", (req, res) => {
    let shopModel = new ShopModel();
    shopModel.sdbdoods(req.query.cid, (results) => {
        res.json(results);
    })
})

router.post("/sdbbrand", (req, res) => {
    let shopModel = new ShopModel();
	console.log(req.query.sid)
    shopModel.sdbbrand(req.query.sid, (results) => {
        res.json(results);
    })
})

//商品修改
router.post("/edit", (req, res) => {
    let shopModel = new ShopModel();
    shopModel.editGoods(req.body, (result) => {
        let re = {
            code: 1
        }
        if (!result.affectedRows) {
            re = { code: -1 }
        }
        res.json(re);
    })
})

router.post("/", (req, res) => {
    let shopModel = new ShopModel();
    shopModel.getShopGoods(req.body.shopId, (results) => {
        res.json(results);
    })
})

router.post("/login", (req, res) => {
    let shopModel = new ShopModel();
    shopModel.login(req.body.shopId, (result) => {
        let re = {
            code: 1,
        }
        if (!result.length) {
            re = { code: -1 }
        } else if (result[0].passWord != req.body.passWord) {
            re = {
                code: 0
            }
        }
        res.json(re);
    })
})




//商铺商品获取
router.post("/getshopgoods",(req, res) => {
    let goodsmodel = new GoodsModel()
    let sid = req.body.sid
    goodsmodel.getgoods(sid,function(result){
         res.json(result);
})
})

//获取商铺列表
router.post("/getsidlist",(req,res)=>{
    let sidlist = new ShopModel()
    sidlist.getsidlist(req.body.page,(result)=>{
         res.json(result);
    })
    
})

//获取商铺信息
router.post('/getshops', (req, res) => {
    let shopsmodel = new ShopModel()
    let sid = req.body.sid

    shopsmodel.getshops(sid,function(result){
         res.json(result);
})
});
module.exports = router;