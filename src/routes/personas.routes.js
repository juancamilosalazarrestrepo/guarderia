const express = require("express");
const persona = require("../models/persona");
const router = express.Router();

const Persona = require("../models/persona");


router.get("/", async (req, res) => {
  const personas = await Persona.find();
  console.log(personas);
  res.json(personas);
});

router.get('/:id', async (req, res ) =>{
  const persona = await Persona.findById(req.params.id);
  res.json(persona); 
})

router.post("/", async (req, res) => {
  const {nombrep, email, direccion ,telefono,cedula } = req.body;
  const persona = new Persona({ nombrep, email, direccion, telefono ,cedula });
  await persona.save();
  res.json({ status: "Persona Saved" });
});

router.put("/:id", async (req, res) => {
  const { nombrep, email, direccion ,telefono,cedula } = req.body;
  const newPersona = { nombrep, email, direccion, telefono ,cedula };
  await Task.findByIdAndUpdate(req.params.id,newPersona);
  
  res.json({status: 'Persona Updated'});
});

router.delete('/:id', async(req, res)=>{
  
  await Task.findByIdAndDelete(req.params.id);
  res.json({status: 'persona Deleted'});
  

});

module.exports = router;