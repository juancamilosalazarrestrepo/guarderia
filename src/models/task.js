const mongoose = require("mongoose");
const { Schema } = mongoose;


const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  raza: { type: String, required: true },
  comportamiento:{type:String, required:true},
  nacimiento:{type:Date, required:true},
  vacunas:{type:String, required:true},
  propietario:{type:String,required:true},
  email: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono:{type:String, required:true},
  cedula:{type:String, required:true},
});



module.exports = mongoose.model("Task", TaskSchema);

