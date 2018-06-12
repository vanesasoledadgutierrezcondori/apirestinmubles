const mongoose = require("../connect");

var Schema = mongoose.Schema;
var barSchema = new Schema({
  department : String,
  zone : String,
  zoom : Number,
  latitude : Number,
  longitude : Number,
    lat : Number,
    lon : Number,
    lat1 : Number,
    lon1 : Number,
    lat2 : Number,
    lon2 : Number,
    lat3 : Number,
    lon3 : Number,
    lat4 : Number,
    lon4 : Number,
    lat5 : Number,
    lon5 : Number,
    lat6 : Number,
    lon6 : Number,
    lat7 : Number,
    lon7 : Number
  
});
var barrio = mongoose.model("barrio", barSchema);
module.exports = barrio;
