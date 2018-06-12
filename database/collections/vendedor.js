const mongoose = require("../connect");

var Schema = mongoose.Schema;

var venSchema = new Schema({
  _id : Schema.Types.ObjectId,
  name : String,
  phone : Number,
  email : String,
  photo : String
});
var vendedor = mongoose.model("vendedor", venSchema);
module.exports = vendedor;
