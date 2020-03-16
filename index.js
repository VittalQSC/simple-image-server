const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const dir = path.join(__dirname, 'public');

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  };

app.use(express.static(dir));

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/file-names', function(req, res) {
    walk(dir, function(err, results) {
        if (err) {
            console.log('ERROE', err);
            return;
        };
        res.send(results.map(result => result.replace(dir, '')));
    });
});

app.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT}/`);
});