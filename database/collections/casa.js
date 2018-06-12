const mongoose = require("../connect");

var Schema = mongoose.Schema;

var casaSchema = new Schema({

  agent: { type: Schema.Types.ObjectId, ref:'vendedor'},
  type : String,
  offer : String,
  zone : { type: Schema.Types.ObjectId, ref:'barrio'},
  lat : Number,
  lng : Number,
  address : String,
  price : Number,
  service : String,
  year : Number,
  bed : Number,
  bath : Number,
  details : String,
  picture : String,
  gallery : Array,
  video : Array,
  other : String,
  school : Array
//  school : { type: Schema.Types.ObjectId, ref:'escuela'}
});
var casa = mongoose.model("casa", casaSchema);
module.exports = casa;
