const router = require('express').Router();
const Department = require('../models/Department');

//create a Department
router.post('/', async (req, res) => {
  console.log('req===', req);
  const newDepartment = new Department(req.body);
  try {
    const savedDepartment = await newDepartment.save();
    res.status(200).json(savedDepartment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a Department
router.put('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
   // console.log(typeOf department._id, req.params.id);
    if (department._id.toString() === req.params.id) {
      await department.updateOne({ $set: req.body });
      res.status(200).json('the department has been updated');
    } else {
      res.status(403).json('you cannot update this department');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a department
router.get('/getById/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a departemnt
router.delete('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (department._id.toString() === req.params.id) {
      await department.deleteOne();
      res.status(200).json('the department has been deleted');
    } else {
      res.status(403).json('you can delete only your department');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all department
router.get('/all', async (req, res) => {
  try {
    const departmentPosts = await Department.find();
    res.status(200).json(departmentPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
