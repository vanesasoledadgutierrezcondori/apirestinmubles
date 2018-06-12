const express = require("express");
const router = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");
//CARGAR FOTO DE LA CASA
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
  cb(null, './public/avatars');
},
filename: function(req, file, cb) {
  cb(null, new Date().toISOString() + file.originalname);
}
});
var fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
var House = require("../../../database/collections/casa");
var Neighborhoods = require("../../../database/collections/barrio");
var Agent = require("../../../database/collections/vendedor");
var School = require("../../../database/collections/escuela");
//INSERTAR CASAS

router.post("/cas",upload.single('picture'), (req, res, next) =>{
  Neighborhoods.findById(req.body.zone);
  Agent.findById(req.body.agent);
//  School.findById(req.body.school);
  var hous ={
    type : req.body.type,
    offer : req.body.offer,
    zone : req.body.zone,
    lat : req.body.lat,
    lng : req.body.lng,
    address : req.body.address,
    price : req.body.price,
    service : req.body.service,
    year : req.body.year,
    bed : req.body.bed,
    bath : req.body.bath,
    details : req.body.details,
    picture : req.file.path,
    gallery : '',
    video : '',
    other : req.body.other,
    school : '',
    agent : req.body.agent
  };
  var housData = new House(hous);
  housData.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "casa registra"
    });
  }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//VER CASAS
router.get("/cas", (req, res, next) => {
  House.find({}).exec( (error, docs) => {
        res.status(200).json(
          
          docs

        );
  })
});

// VER UNA SOLA CASA EN ESPECIFICO

router.get(/cas\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idcas = url.split("/")[2];
  House.findOne({_id : idcas}).exec().then(docs => {
    if (docs != null) {
        res.status(200).json(docs);
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
