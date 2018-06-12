const mongoose = require("../connect");
var galeriaSchema = {
  name : String,
  physicalpath : String,
  relativepath : String
};
var galeria = mongoose.model("galeria", galeriaSchema);
module.exports = galeria;
