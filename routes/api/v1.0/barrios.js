const express = require("express");
const router = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");

var Neighborhoods = require("../../../database/collections/barrio");
var House = require("../../../database/collections/casa");
//INSERTAR BARRIO

router.post("/barr",(req, res) =>{
  var neig ={
    _id: new mongoose.Types.ObjectId(),
    department : req.body.departamento,
    zone : req.body.zona,
    zoom : req.body.tamanio,
    latitude : req.body.latitude,
    longitude : req.body.longitude,
      lat : req.body.lat,
      lon : req.body.lon,
      lat1 : req.body.lat1,
      lon1 : req.body.lon1,
      lat2 : req.body.lat2,
      lon2 : req.body.lon2,
      lat3 : req.body.lat3,
      lon3 : req.body.lon3,
      lat4 : req.body.lat4,
      lon4 : req.body.lon4,
      lat5 : req.body.lat5,
      lon5 : req.body.lon5,
      lat6 : req.body.lat6,
      lon6 : req.body.lon6,
      lat7 : req.body.lat7,
      lon7 : req.body.lon7
  };
  var neigData = new Neighborhoods(neig);
  neigData.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "zona registra"
    });
  }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//VER BARRIOS
router.get("/barr", (req, res, next) => {
  Neighborhoods.find().select('_ id department zone zoom coordinates latitude longitud lat lon lat1 lon1 lat2 lon2 lat3 lon3 lat4 lon4 lat5 lon5 lat6 lon6 lat7 lon7 ').exec().then(docs => {
    var response= (
       docs.map(doc => {
        return{
          department: doc.department,
          zone: doc.zone,
          zoom: doc.zoom,
          latitude: doc.latitude,
          longitude: doc.longitude,
          cod: doc._id,
          coordinates:[
            {lat:doc.lat},
             {lon:doc.lon},
             {lat:doc.lat1},
             {lon:doc.lon1},
             {lat:doc.lat2},
             {lon:doc.lon2},
             {lat:doc.lat3},
             {lon:doc.lon3},
             {lat:doc.lat4},
             {lon:doc.lon4},
             {lat:doc.lat5},
             {lon:doc.lon5},
             {lat:doc.lat6},
             {lon:doc.lon6},
             {lat:doc.lat7},
             {lon:doc.lon7},
             {lat:doc.lat},
             {lon:doc.lon}
          ]
        };
      })
    );
    res.status(200).json(response);
  }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
  });
});
// VER UN SOLO BARRIO EN ESPECIFICO
router.get(/barr\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idbarr = url.split("/")[2];
  Neighborhoods.findOne({_id : idbarr}).exec().then(docs => {
    if(docs != null){
      res.status(200).json({
        datalles: 'http://localhost:7777/api/v1.0/barr/' + idbarr
      });
      return;
    }
    res.status(200).json({
      message: 'no existe recurso'
    });
  }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
  });
});

module.exports = router;
