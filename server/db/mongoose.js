const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); // avoid using the deprecated ensureIndex method
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/GeoLocSharerApp', { useNewUrlParser: true });

module.exports = { mongoose };
