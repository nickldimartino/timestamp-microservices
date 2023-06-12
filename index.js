// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// TODO: Timestamp Microservice
// routes are set up through express
// package.json has express installed
// app is initialized to express()

// GET route on the '/api' path with middleware responding with a JSON object containing
// a UNIX and UTC date
app.get("/api", (req, rsp) => {
  let dateObj = new Date();    // empty JSON object

  // respond with a JSON object containing the UNIX and UTC dates
  rsp.json({
    unix: dateObj.valueOf(),
    utc: dateObj.toUTCString()
  });
});

// GET route on the path '/api/:dateString' with a middleware converting the date 
// to the correct formats and responding with a JSON object containing the newly
// formatted dates
app.get("/api/:dateString", (req, rsp) => {
  let dateStr = req.params.dateString;  // date received in the URL request 
  console.log(dateStr);

  // if the received date is 5 or more numbers
  if (/\d{5,}/.test(dateStr)) {
    // convert the string to an int
    let dateInt = parseInt(dateStr);

    // respond with a JSON obj containing the parsed int in UNIX and UTC format
    rsp.json({
      unix: dateInt, 
      utc: new Date(dateInt).toUTCString()
    });
  } else {
    // create an object with the current date
    let dateObj = new Date(dateStr);

    // if the current date is not a valid date, then respond with an error
    if (dateObj.toString() === "Invalid Date") {
      rsp.json({error: "Invalid Date"});
    } else {
      // if the current date is valid, convert it to an int
      let dateInt = parseInt(dateObj.valueOf());

      // respond with a JSON object containing the UNIX and UTC date
      rsp.json({
        unix: dateInt,
        utc: dateObj.toUTCString()
      });
    }
  }
});