const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const port = process.env.PORT || 3002;
const app = express();
// app.listen(port, () => console.log(`Listening on ${port}`));

app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
