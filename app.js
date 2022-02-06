const express = require('express');
const app = express();
const mongoose = require('mongoose');
let consolidate = require('consolidate');
app.engine('html', consolidate.swig)
const path = require('path');
const { json } = require('express/lib/response');
app.use(express.json());
const port = process.env.PORT || 3000;
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const db = 'mongodb://localhost/userManagement';
mongoose.connect(db);
const mongooseConnection = mongoose.connection;



mongooseConnection.on('error', console.error.bind(console, 'Connection error:'));
mongooseConnection.once('open', function () {
    console.log('Connected');
});

const accountschema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    createdDate: { type: Date, default: Date.now }

});
const user = mongoose.model('user', accountschema);



app.post('/create-account', (req, res) => {
    let newPage;
    const newAcc = new user();
    newAcc.firstName = req.body.firstName;
    newAcc.lastName = req.body.lastName;
    newAcc.email = req.body.email;
    newAcc.age = req.body.age;
    newAcc.save((err, data) => {
        if (err) {
            return console.error(err);
        }
        newPage = `
            <html>
            <head>
            <style>
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            body {
                background-color: black;
                color: white;
            }
    
            label {
                margin-top: 1em;
            }
    
            input {
                margin-top: .5em;
                width: 10em;
            }
    
            button {
                border-radius: 5em;
                background-color: grey;
                margin-top: 1em;
                width: 10em;
            }
    
            body {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            a {
                text-decoration: none;
                color: azure;
                border: 2px solid white;
            }
    
            .nav {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-around;
            }
        </style>
            </head>
            <body>
            <h1>Account Successfully Created Account</h1>
            <p>First name: ${newAcc.firstName}</p>
            <p>Last name: ${newAcc.lastName}</p>
            <p>Email: ${newAcc.email}</p>
            <p>Age: ${newAcc.age}</p>
            <a href="/">Home</a>
            </body>
            </html>
            `;
        res.send(newPage);
    });
})


app.post('/edit', (req, res) => {
    let newPage
    let accChange = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let age = req.body.age;
    user.findOneAndUpdate({ firstName: accChange }, { lastName: lastName, email: email, age: age },
        { new: true },
        (err, data) => {
            if (err) return console.log(err);
            newPage = `
            <html>
            <head>
            <style>
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            body {
                background-color: black;
                color: white;
            }
    
            label {
                margin-top: 1em;
            }
    
            input {
                margin-top: .5em;
                width: 10em;
            }
    
            button {
                border-radius: 5em;
                background-color: grey;
                margin-top: 1em;
                width: 10em;
            }
    
            body {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            a {
                text-decoration: none;
                color: azure;
                border: 2px solid white;
            }
    
            .nav {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-around;
            }
        </style>
    </head>
    <body>
            <h1>Account Edited</h1>
            <p>First name: ${accChange}</p>
            <p>Last name: ${lastName}</p>
            <p>Email: ${email}</p>
            <p>Age: ${age}</p>
            <a href="/">Home</a>
            </body>
            </html>
            `;
            res.send(newPage);
        });
})

app.post('/delete', (req, res) => {
    let firstNameDelete = req.body.firstName;
    let lastNameDelete = req.body.lastName
    let newPage
    user.deleteOne({ firstName: firstNameDelete, lastName: lastNameDelete },
        (err, data) => {
            if (err) return console.log(err);
            newPage = `
            <html>
            <head>
            <style>
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            body {
                background-color: black;
                color: white;
            }
    
            label {
                margin-top: 1em;
            }
    
            input {
                margin-top: .5em;
                width: 10em;
            }
    
            button {
                border-radius: 5em;
                background-color: grey;
                margin-top: 1em;
                width: 10em;
            }
    
            body {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            a {
                text-decoration: none;
                color: azure;
                border: 2px solid white;
            }
    
            .nav {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-around;
            }
        </style>
    </head>
    <body>
            <h1>Account Successfully Deleted</h1>
            <p>First: ${firstNameDelete} Last: ${lastNameDelete}  deleted</p>
            </body>
            </html>
            `;
            if (data.deletedCount == 0) {
                newPage = `<h1>Error</h1><p>${firstNameDelete} ${lastNameDelete} doesn't exist</p>`
            }
            newPage += '<a href="/">Home</a>'
            res.send(newPage);
        });
})


app.get('/accounts:direction', (req, res) => {
    let newPage
    user.find({}, (err, accounts) => {
        accounts.map((details) => {
            newPage = `
            <html>
            <head>
            <style>
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            body {
                background-color: black;
                color: white;
            }
    
            label {
                margin-top: 1em;
            }
    
            input {
                margin-top: .5em;
                width: 10em;
            }
    
            button {
                border-radius: 5em;
                background-color: grey;
                margin-top: 1em;
                width: 10em;
            }
    
            body {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            a {
                text-decoration: none;
                color: azure;
                border: 2px solid white;
            }
    
            .nav {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-around;
            }
        </style>
    </head>
    <body>
    <h1>Account:</h1>
    <p>First Name: ${details.firstName}</p>
    <p>Last Name: ${details.lastName}</p>
    <p>Email: ${details.email}</p>
    <p>Age: ${details.age}</p>
     </body>
    </html>
            `
        })
        newPage += '<a href="/">Home</a>'
        res.send(newPage)
    }).sort({ 'firstName': req.params.direction })


})

app.post('/search', (req, res) => {
    let query = req.body.query;
    let newPage
    user.find({ $or: [{ firstName: query }, { lastName: query }] }, (err, accounts) => {
        if (accounts == false) {
            newPage += 'No Results <br><br>'
        }
        accounts.map((details) => {
            newPage += `
            <html>
            <head>
            <style>
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            body {
                background-color: black;
                color: white;
            }
    
            label {
                margin-top: 1em;
            }
    
            input {
                margin-top: .5em;
                width: 10em;
            }
    
            button {
                border-radius: 5em;
                background-color: grey;
                margin-top: 1em;
                width: 10em;
            }
    
            body {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            a {
                text-decoration: none;
                color: azure;
                border: 2px solid white;
            }
    
            .nav {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-around;
            }
        </style>
    </head>
    <body>
    <h1>Results:</h1>
    <p>First Name: ${details.firstName}</p>
    <p>Last Name: ${details.lastName}</p>
    <p>Email: ${details.email}</p>
    <p>Age: ${details.age}</p>
    </body>
    </html>
            `
        })
        newPage += '<a href="/search">Back to Search</a>'
        res.send(newPage)
    })
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/search', (req, res) => {
    res.render('search')
})

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`server lisening on: ${port}`);
});