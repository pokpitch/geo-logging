var express = require('express');
var router = express.Router();
var pg = require('pg');


router.post('/api/v1/locations', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {location_name: req.body.location_name, gps_location: req.body.gps_location};

    var client = new pg.Client({
      user: "fieugtmjheqfph",
      password: "aHGOXfHSxTZmnOe-Y8zwkGTtpS",
      database: "d5mk9p84lf82ab",
      port: 5432,
      host: "ec2-75-101-162-243.compute-1.amazonaws.com",
      ssl: true
    });

    client.connect();

          // SQL Query > Insert Data
          client.query("INSERT INTO geolocation(location_name, gps_location) values($1, $2)", [data.location_name, data.gps_location]);

          // SQL Query > Select Data
          var query = client.query("SELECT * FROM geolocation ORDER BY id ASC");

          // Stream results back one row at a time
          query.on('row', function(row) {
              results.push(row);
          });

          // After all data is returned, close connection and return results
          query.on('end', function() {
              return res.json(results);
          });

});


module.exports = router;
