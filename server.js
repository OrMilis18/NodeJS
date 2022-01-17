const express = require('express');
const mongoose = require('mongoose');

const Jokes = require('./model/Jokes')

const app = express();
const PORT = 3000;

app.use("/jokes",express.static('public'));


mongoose.connect('mongodb://localhost:27017/Jokes', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// middleware - תווכה
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/all', (req, res)=>{
    Jokes.find({}).exec((err, jokes) => {
        if (err) console.log(err.message);
        else res.json(jokes);
    })
});

app.post('/add', (req, res)=> {

    let newJoke = new Jokes();
    newJoke.name = req.body.name;
    newJoke.age = req.body.age;
    newJoke.joke = req.body.joke;
    newJoke.date = req.body.date;

    newJoke.save((err, joke)=> {
        if (err){
            res.status(404);
            res.send('Failed saving...');
        }
        else{
            res.status(201);
            res.send('New joke was added successfully');
        }
    })
});

app.put('/update/:name', (req, res)=>{
    Jokes.findOneAndUpdate(
        { name: req.params.name }, { $set: {joke: req.body.joke} }, 
        (err, updatedJoke) => {
            if(err) {
                res.status(404);
                res.send(`Failed updating joke...`);
        }else{
            res.status(200);
            res.send(`The joke was updated successfully`);
        }}
    )
});

app.delete('/delete/:name', (req, res)=>{
    Jokes.deleteOne({ name: req.params.name }).exec((err, joke)=>{
        if(err) {
            res.status(404);
            res.send(`Failed deleting joke...`);
        }else{
            res.status(200);
            res.send(`Joke was deleted successfully`);
        }
    })
});

app.listen(PORT, ()=>console.log(`Listening in PORT ${PORT}`))


