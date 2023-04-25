const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();
let dataPath = path.join(__dirname, '../request.json');
let arr = [];

// app.get('/', (req, res) => {
//     res.send('Hello from the web server side...');
// });

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.post('/formsubmissions', (req, res) => {
    let obj = {
        email: req.body.email,
        password: req.body.password,
    };
    arr = [...arr, obj];
    fs.writeFile(dataPath, JSON.stringify(arr), (err) => {
        if (err) console.log(err);
    });

    res.send(arr);
});


app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);