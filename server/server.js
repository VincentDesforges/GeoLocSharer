const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Report } = require('./models/report');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// POST '/report'
app.post('/report', (req, res) => {
  // console.log(req.body);
  const report = new Report({
    title: req.body.title,
    position: req.body.position
  });

  report.save().then((doc) => {
    // console.log('Saved Report', doc);
    res.send(doc);
  }, (err) => {
    // console.log('Unable to save report', err);
    res.status(400).send(err);
  });
});

// GET '/report/:lat/:lng'
app.get('/report/:lat/:lng', (req, res) => {
  Report.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)] },
        distanceField: 'dist.calculated',
        maxDistance: 10000,
        spherical: true
      }
    }
  ]).then((reports) => {
    res.send({ reports });
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET '/report'
app.get('/report', (req, res) => {
  Report.find().then((reports) => {
    res.send({ reports });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
