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
  price:  Number
});
let Model = mongoose.model("products", Schema);

let Schema2 = mongoose.Schema({
  username: String,
  password: String
});
let Model2 = mongoose.model("users", Schema2);

module.exports.showIndex = (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  });
  // console.log(req.session.username);
  let sort = parseInt(req.param("sortFlag"));
  console.log(sort);
  console.log(typeof sort);
  Model.find({})
    .sort({ price: sort })
    .exec((err, data) => {
      // console.log(data);
      res.send(data);
    });
};
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
