const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    department: {
      type: String,
      default: false,
    },
    followUpTime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
