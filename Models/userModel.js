const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    ID: { type: Number, required: true },
    Name: { type: String, required: true },
    Password: { type: String, required: true },
    Username: { type: String, required: true},
    PhoneNo: { type: Number, required: true }
});

module.exports = mongoose.model('userCollection', schema);

