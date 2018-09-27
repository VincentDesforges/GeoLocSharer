const mongoose = require('mongoose');

const Report = mongoose.model('Report', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  time: {
    type: Date,
    default: Date.now()
  },
  position: {
    type: Map,
    of: Number,
    required: true
  }
});

module.exports = { Report };
