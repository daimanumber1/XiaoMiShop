let mongoose = require("mongoose");
let formidable = require("formidable");
mongoose.connect("mongodb://127.0.0.1:27017/xiaomi");
const con = mongoose.connection;
con.on("error", console.error.bind(console, "连接数据库失败"));
con.once("open", () => {
  //成功连接
  console.log("数据库连接成功");
});
let Schema = mongoose.Schema({
  pname: String,
  url: String,
  price: Number
});
let Model = mongoose.model("products", Schema);

let Schema2 = mongoose.Schema({
  username: String,
  password: String
});
let Model2 = mongoose.model("users", Schema2);
// 通过req的参数（升序降序、页数、价格区间）返回首页全部商品列表
module.exports.showIndex = (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  });
  // console.log(req.session.username);
  //
  let sort = parseInt(req.param("sortFlag"));
  let priceIndex = req.param("priceIndex");
  let page = req.param("page");
  let pageSize = 8;
  let skipNumber = (page - 1) * pageSize;
  // 2个小细节  这里不能用let  因为下面switch  语句中
  // 修改数据后在findParams中priceGT和priceLt还是为''
  var priceGt = "";
  var priceLt = "";
  let findParams = {};
  if (priceIndex != "0") {
    switch (priceIndex) {
      case "1":
        priceGt = 0.0;
        priceLt = 100.0;
        break;
      case "2":
        priceGt = 100.0;
        priceLt = 500.0;
        break;
      case "3":
        priceGt = 500.0;
        priceLt = 1000.0;
        break;
    }
    findParams = {
      price: {
        $gt: priceGt,
        $lt: priceLt
      }
    };
  }
  console.log(findParams);
  Model.find(findParams)
    .sort({
      price: sort
    })
    .limit(pageSize)
    .skip(skipNumber)
    .exec((err, data) => {
      // console.log(data);
      res.send(data);
    });
};
// 登录按钮实现的功能  设置session
module.exports.doLogin = (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  });
  // res.send("11111111111");
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    // console.log(fields);
    Model2.find(fields).exec((err, data) => {
      // console.log(data);
      // res.send(0)
      if (data[0]) {
        req.session.username = fields.username;
        console.log(req.session.username + "2222222");
        res.send("1");
        return false;
      } else {
        res.send("0");
      }
    });
  });
};
