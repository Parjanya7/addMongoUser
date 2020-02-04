const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../Models/userModel');

const router = express.Router();

router.post('/addUser', (req, res) => {

    console.log(req.body);

    let insertVar = new userModel();

    let salt = bcrypt.genSaltSync(10);
    let hashedPass = bcrypt.hashSync(req.body.Password, salt);

    insertVar.ID = req.body.ID;
    insertVar.Name = req.body.Name;
    insertVar.Username = req.body.Username;
    insertVar.Password = hashedPass;
    insertVar.PhoneNo = req.body.PhoneNo;

    insertVar.save( err => {

        if(err) {
            console.log(err);
            res.json({ msg: 'User could not be created.'});
        }
        else
            res.json({ msg: 'User successfully created.'});
    });
});

router.post('/fetchUser', (req, res) => {

    userModel.findOne({ ID: req.body.ID } ,(err, docs) => {

        if(err){
            console.log(err);
            res.json({ msg: 'Some Error.' });
        }
        else
            res.json(docs);
    });
});

router.post('/login', (req, res) => {

    console.log(req.body.Username);

    userModel.findOne({ Username: req.body.Username }, (err, docs) => {

        console.log(docs);

        if(!docs)
            res.json({ msg: 'Invalid Username' });
        else if(bcrypt.compareSync(req.body.Password, docs.Password))
            res.json(docs);
        else
            res.json({ msg: 'Invalid Password'});
    });
});

module.exports = router;