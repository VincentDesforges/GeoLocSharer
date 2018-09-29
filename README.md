# GeoLocSharer

GeoLocSharer is a react-native app with a node back-end that allows the user to generate title reports. The user can also see nearby reports from other users.

## Installation
```
npm install
cd client
npm install
cd ../server
npm install
cd ..
```

## Testing and Seeding Data
When running the test, some data is automatially generated:
* Quartier Leopold 50.842968, 4.386139
* Grand-Place 50.847566, 4.352381
* Charleroi 50.414132, 4.444418

In your simulator I suggest setting coordinates in the general Brussels region (e.g. Evere 50.874646, 4.402978).
```
npm test
```

You can also create your own reports via Postman or other using a post request at: **localhost:3000/report**

with the following body structure:
```
{
  "title": "Get me somewhere",
  "position": {
    "coordinates": [4.402978, 50.874646]
  }
}
```

## Development
Before launching the app please ensure that you have a MongoDB connection running on localhost:27017
```
npm run dev
```
Now you can open the iphone simulator:
```
cd client
react-native run-ios
```
