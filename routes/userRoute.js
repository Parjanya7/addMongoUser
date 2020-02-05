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
            res.json({ msg: 'User successfully created.'}); // Client will be redirected to login page after this, I guess.
    });
});

router.post('/fetchUser', (req, res) => {

    console.log(req.header.authKey);

    userModel.findOne({ ID: req.body.ID } ,(err, docs) => {

        if(req.header.authKey === docs._id) {
    
            if(err){
                console.log(err);
                res.json({ msg: 'Some Error.', authKey: req.header.authKey });
            }
            else
                res.json({ docs: docs, authKey: req.header.authKey });
        }
        else
            res.json({ msg: 'False User.' }); 
    });
});

router.post('/login', (req, res) => {

    console.log(req.body.Username);

    userModel.findOne({ Username: req.body.Username }, (err, docs) => {

        console.log(docs);

        if(!docs)
            res.json({ msg: 'Invalid Username' });
        else if(bcrypt.compareSync(req.body.Password, docs.Password))
            res.json({ docs: docs, authKey: docs._id }); // _id of user will be sent as the authKey, which is unique for every users. Does not required to update at all.
        else
            res.json({ msg: 'Invalid Password'});
    });
});

module.exports = router;