const express = require("express");
const task = require("../models/task");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.json(tasks);
});

router.get('/:id', async (req, res ) =>{
  const task = await Task.findById(req.params.id);
  res.json(task); 
})

router.post("/", async (req, res) => {
  const { title, description, raza } = req.body;
  const task = new Task({ title, description, raza });
  await task.save();
  res.json({ status: "Task Saved" });
});

router.put("/:id", async (req, res) => {
  const { title, description, raza } = req.body;
  const newTask = { title, description, raza };
  await Task.findByIdAndUpdate(req.params.id,newTask);
  
  res.json({status: 'Task Updated'});
});

router.delete('/:id', async(req, res)=>{
  
  await Task.findByIdAndDelete(req.params.id);
  res.json({status: 'Task Deleted'});
  

});

module.exports = router;
