const mongoose = require('mongoose');

const { Schema } = mongoose;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
    required: true
  }
});

const ReportSchema = new Schema({
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
    type: GeoSchema,
    required: true
  }

});

const Report = mongoose.model('Report', ReportSchema);

module.exports = { Report };
