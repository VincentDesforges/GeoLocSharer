const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Report } = require('./models/report');

const port = 3000;

const app = express();
app.use(bodyParser.json());

// POST '/report'
app.post('/report', (req, res) => {
  if (!req.body.position || !req.body.position.lat || !req.body.position.lng) {
    res.status(400).send({ errorMessage: 'position: {lat: \'Number\', lng: \'Number\'} is required' });
  } else {
    const report = new Report({
      title: req.body.title,
      position: {
        lat: req.body.position.lat,
        lng: req.body.position.lng
      }
    });

    report.save().then(doc => {
      // console.log('Saved Report', doc);
      res.send(doc);
    }, err => {
      // console.log('Unable to save report', err);
      res.status(400).send(err);
    });
  }
});

// GET '/report/:lat/:lng'
// At the moment getting everything from the db
app.get('/report/:lat/:lng', (req, res) => {
  Report.find().then(reports => {
    res.send({reports});
  }, err => {
    res.status(400).send(err);
  })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
