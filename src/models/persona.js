const mongoose = require("mongoose");
const { Schema } = mongoose;




const PersonaSchema = new Schema({
  nombrep: { type: String, required: true },
  email: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono:{type:String, required:true},
  cedula:{type:String, required:true},
  
});

module.exports = mongoose.model("Persona", PersonaSchema);