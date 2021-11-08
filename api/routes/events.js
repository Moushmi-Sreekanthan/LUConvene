const router = require('express').Router();
const Event = require('../models/Events');

//create a events
router.post('/', async (req, res) => {
  console.log('req===', req);
  const newevents = new Event(req.body);
  try {
    const event = await newevents.save();
    res.status(200).json(newevents);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event._id.toString() === req.params.id) {
      await event.updateOne({ $set: req.body });
      res.status(200).json('the Event has been updated');
    } else {
      res.status(403).json('you cannot update this Event');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a Event
router.get('/getById/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a Event
router.delete('/:id', async (req, res) => {
  try {
    const evemt = await Event.findById(req.params.id);
    if (evemt._id.toString() === req.params.id) {
      await evemt.deleteOne();
      res.status(200).json('the evemt has been deleted');
    } else {
      res.status(403).json('you can delete only your evemt');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all events
router.get('/all', async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
