const express = require("express");
const router = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");
//CARGAR FOTO DE AGENTE DE VENTA
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
  cb(null, './public/uploads');
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
var Agent = require("../../../database/collections/vendedor");
//INSERTAR AGENTE DE VENTA

router.post("/ven", upload.single('photo'),(req, res) =>{
  if (req.body.nombre == "" && req.body.correo == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var agent ={
    _id: new mongoose.Types.ObjectId(),
    name : req.body.nombre,
    phone : req.body.movil,
    email : req.body.correo,
    photo : req.file.path
  };
  var agentData = new Agent(agent);
  agentData.save().then(result => {
    console.log(result);
    res.status(201).json({
      Agentesss: {
        nombre: result.name,
        movil: result.phone,
        correo: result.email,
        foto: result.photo,
        bienvenido: {
          hola: result.name
        }
      }
    });
  }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
//VER AGENTES
router.get("/ven", (req, res, next) => {
  Agent.find({}).exec((error, docs) => {
    res.status(200).json(docs);
  })
  /*Agent.find().select("name phone email _id photo").exec().then(docs => {
      var response = {
        cantidad: docs.length,
        agentes: docs.map(doc => {
          return {
            nonbre: doc.name,
            movil: doc.phone,
            correo: doc.email,
            foto: doc.photo,
            cod: doc._id,
            fotos:[doc.name, doc.photo]
          };
        })
      };
      res.status(200).json(response);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });*/
});
// VER A UN SOLO AGENTE
router.get("/ven/:id", (req, res) => {
  var idAgent = req.params.id;
  Agent.findById(idAgent).select('name phone email photo _id').exec().then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            agente: doc,
            detalles: {

                url: 'http://localhost:7777/api/v1.0/ven/'+ idAgent
            }
        });
      } else {
        res.status(404).json({
           "msn": "No existe el recurso "
         });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
