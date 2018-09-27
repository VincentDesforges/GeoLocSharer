const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Report } = require('../models/report');

/*
Places from Google:
Evere 50.874646, 4.402978
Quartier Leopold 50.842968, 4.386139
Grand-Place 50.847566, 4.352381
Charleroi 50.414132, 4.444418
*/

const reports = [
  {
    title: 'Quartier Leopold',
    position: { lat: 50.842968, lng: 4.386139 }
  },
  {
    title: 'Grand-Place',
    position: { lat: 50.847566, lng: 4.352381 }
  },
  {
    title: 'Charleroi',
    position: { lat: 50.414132, lng: 4.444418 }
  }
];

beforeEach(done => {
  Report.deleteMany({}).then(() => {
    return Report.insertMany(reports);
  }).then(() => done());
});

describe('POST /report', () => {
  it('should create a new report', done => {
    const title = 'Test report title';
    const position = {
      lat: 38.4,
      lng: -123.2
    };

    request(app)
      .post('/report')
      .send({ title, position })
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(title);
        expect(res.body.position).toEqual(position);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Report.find({ title }).then(reports => {
          expect(reports.length).toBe(1);
          expect(reports[0].title).toBe(title);
          done();
        }).catch(err => done(err));
      });
  });

  it('should not create a report without position data', done => {
    const title = 'Invalid request';
    request(app)
      .post('/report')
      .send({ title })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Report.find().then(reports => {
          expect(reports.length).toBe(3);
          done();
        }).catch(err => done(err));
      });
  });

  it('should not create a report without a title', done => {
    const position = {
      lat: 38.4,
      lng: -123.2
    };
    request(app)
      .post('/report')
      .send({ position })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Report.find().then(reports => {
          expect(reports.length).toBe(3);
          done();
        }).catch(err => done(err));
      });
  });

  it('should not create a report with incorrect position data', done => {
    const title = 'Invalid request 2';
    const position = {
      lat: 'Wrong data type',
      lng: -123.2
    };
    request(app)
      .post('/report')
      .send({ title, position })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Report.find().then(reports => {
          expect(reports.length).toBe(3);
          done();
        }).catch(err => done(err));
      });
  });
});

describe('GET /report/:lat/:lng', () => {
  it('should get all todos within 10km, but no more', done => {
    const position = {
      lat: 50.8503,
      lng: 4.3517
    };

    request(app)
      .get(`/report/${position.lat}/${position.lng}`)
      .expect(200)
      .expect(res => {
        expect(res.body.reports.length).toBe(2);
        expect(res.body.reports[0].title).toBe('Quartier Leopold');
        expect(res.body.reports[1].title).toBe('Grand-Place');
      }).end(done);
  });
});
