const express = require('express');
const mongodb = require('./data/database.js');

const app = express();
const port = process.env.PORT || 3001;

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to MongoDB');
    }
})


app.listen(port, () => (console.log(`Listening on port ${port}`)));