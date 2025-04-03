const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4500;
const secret = 'HackTour India';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://hacktourindia:N9iXlz2CDYQJwVbM@cluster0.vqrwaaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const companySchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    type: String,
    category: String,
    website: String
});

const creatorSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    telegram: String,
    country: String,
    state: String
});

const Brand = mongoose.model('Brand',companySchema);
const Creator = mongoose.model('Creator', creatorSchema);


app.get('/',(req,res)=> {
    res.json({
        message:"Heeeeeeeeee"
    })
});

app.post('/register-brand',async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const category = req.body.category;
    const type = req.body.type;
    const website = req.body.website;
    let existingUser = await User.findOne({email});
    if(existingUser) 
    {
        return res.json({
            message: "Email already exists"
        });
    }
    existingUser = await User.findOne({website});
    if(existingUser) 
    {
        return res.json({
            message: "Website already registered"
        });
    }
    const json = {email,password,name,category,type,website};
    const newBrand = new Brand(json);
    await newBrand.save();
    const token = jwt.sign(json,secret);
    return res.json({
        message: "Brand Registration successful",
        token: token,
        email: email
    });
});

app.post('/register-creator',async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const telegram = req.body.telegram;
    const country = req.body.country;
    const state = req.body.state;
    let existingUser = await User.findOne({email});
    if(existingUser) 
    {
        return res.json({
            message: "Email already exists"
        });
    }
    existingUser = await User.findOne({telegram});
    if(existingUser) 
    {
        return res.json({
            message: "Telegram already registered"
        });
    }
    const json = {email,password,name,telegram,country,state};
    const newCreator = new Creator(json);
    await newCreator.save();
    const token = jwt.sign(json,secret);
    return res.json({
        message: "Creator Registration successful",
        token: token,
        email: email
    });
});


app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})