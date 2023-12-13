const express = require('express');
const router = express.Router();
const ClinicModel = require('../models/ClinicModel');
const mqttClient = require('../mqtt');

router.get('/clinics', async (req, res) => {
    try {
        const clinics = await ClinicModel.find();
        const message = "Clinic has been fetched"
        // mqttClient.sendMessage(message + " " + clinics.toString());
        res.status(200).json({ message: message, clinics: clinics });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/clinics', async (req, res, next) => {
    const clinic = new ClinicModel(req.body);
    clinic
      .save()
      .then(function (clinic) {
        const message = "Clinic has been created"
        mqttClient.sendMessage(message);
        // mqttClient.sendMessage(message + " " + clinic.toString());
        res.status(201).json({ message: message, clinic: clinic });
      })
      .catch(function (error) {
       if(error.code===11000){
        return res.status(409).send({error: 'Clinic already exist'}); // status 409 states conflicts
       }
        return next(error);
      });
})

router.patch('/clinics/:id', async (req, res, next) => {
    const id = req.params.id;
    ClinicModel.findById(id).then(function (clinic){
      Object.assign(clinic, req.body);
      clinic.save().then(function (clinic){
        const message = "Clinic has been updated"
        mqttClient.sendMessage(message);
        // mqttClient.sendMessage(message + " " + clinic.toString());
        return res.status(200).json({ message: message , clinic: clinic }); 
      })

    }).catch(err=>{
      return next(err);
    })
})

router.delete('/clinics/:id', async (req, res, next) => {
  const id = req.params.id;
  ClinicModel.findByIdAndDelete(id)
    .then(clinic => {
      if (!clinic) {
        return res.status(404).json({ error: 'Clinic not found' });
      }
      const message = "Clinic has been deleted"
      mqttClient.sendMessage(message);
      // mqttClient.sendMessage(message + " " + clinic.toString());
      res.status(200).json({ message: message, deletedClinic: clinic });
    })
    .catch(err => {
      return next(err);
    });
});


module.exports = router;