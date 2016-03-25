var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://fieugtmjheqfph:aHGOXfHSxTZmnOe-Y8zwkGTtpS@ec2-75-101-162-243.compute-1.amazonaws.com:5432/d5mk9p84lf82ab';

var client = new pg.Client({
  user: "fieugtmjheqfph",
  password: "aHGOXfHSxTZmnOe-Y8zwkGTtpS",
  database: "d5mk9p84lf82ab",
  port: 5432,
  host: "ec2-75-101-162-243.compute-1.amazonaws.com",
  ssl: true
});

client.connect();

var query = client.query('CREATE TABLE IF NOT EXISTS geolocation(id SERIAL PRIMARY KEY, location_name VARCHAR(200), gps_location VARCHAR(100))');
query.on('end', function() { client.end(); });
