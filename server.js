// server.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// mongoDB
import { default as mongodb} from 'mongodb';
const MongoClient = mongodb.MongoClient;

// initialize express app
const app = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

dotenv.config();

app.set('view engine', 'ejs');

app.use(express.static('public'));

const connectionString = process.env.connectionString;
const __dirname = process.env.PWD;

MongoClient.connect(connectionString, {useUnifiedTopology : true})
    .then(client => {
        console.log('Connected to Database');

        const db = client.db('littleFreeLibraries');
        const libraryCollection = db.collection('libraries');
        
        app.get('/', (req,res) =>{
            // res.sendFile(__dirname + '/index.html');
            db.collection('libraries').find().toArray()
                .then(results => {
                    res.render('index.ejs', {libraries: results});
                })
                .catch(error => console.error(error));
            
        });
        app.post('/libraries', (req, res) =>{
            libraryCollection.insertOne(req.body)
                .then(result =>{
                    res.redirect('/');
                })
                .catch(error => console.error(error));
        });
        app.put('/libraries', (req, res) => {
            console.log(req.body);
        })
        // app.post();
        app.listen(3000, function() {
            console.log('Listening on 3000');
        });
    })
    .catch(console.error);
