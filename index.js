const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const dir = path.join(__dirname, 'public');

app.use(express.static(dir));

app.get('/test-image-service', function(req, res) {
    res.send('test-image-service');
});

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/file-names', function(req, res) {
    fs.readdir(dir, function(err, files) {
        if (err) {
            next();
        }

        res.send(files);
    });
});

app.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT}/`);
});