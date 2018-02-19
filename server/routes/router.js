let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/xiaomi");
const con = mongoose.connection;
con.on("error", console.error.bind(console, "连接数据库失败"));
con.once("open", () => {
  //成功连接
  console.log("数据库连接成功");
});
let Schema = mongoose.Schema({
  pname: String
});
let Model = mongoose.model("products", Schema);

module.exports.showIndex = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  Model.find({}).exec((err, data) => {
    console.log(data);
    res.send(data);
  });
};
