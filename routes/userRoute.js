const express = require('express');
const userModel = require('../Models/userModel');

const router = express.Router();

router.post('/addUser', (req, res) => {

    console.log(req.body);

    let insertVar = new userModel();

    insertVar.ID = req.body.ID;
    insertVar.Name = req.body.Name;
    insertVar.Username = req.body.Username;
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

module.exports = router;