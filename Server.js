const express = require('express');
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const config = require('./config');

const app = express();

config.middleWare(app, express, bodyPareser);
config.authKeyManagement(cron);
config.mongoConnect(mongoose);
config.ROUTES(app);

app.listen(config.PORT, () => console.log(`Server Running on PORT: ${config.PORT}`));


