import express from 'express';
const chalk = require('chalk');
var MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 8000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/techBlog', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/techBlog', { useNewUrlParser: true },  (err, client) => {
        if (err) throw err;

        const db = client.db('techBlog');
        db.collection('subzTechBlog').find().forEach((result) => {
            res.json(result);
        });
    });

});

app.listen(PORT, () => {
    console.log(chalk.blue('Server running on port '), chalk.green(PORT));
    console.log(chalk.green(`The application can be accessed on http://localhost:${PORT}/`))
});