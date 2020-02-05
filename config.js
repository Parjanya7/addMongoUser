module.exports = {

    PORT: process.env.PORT || 3005,

    middleWare: (app, express, bodyParser) => {

        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    },

    ROUTES: (app) => {

        const routes = require('./routes');
        
        routes(app);
    },

    mongoConnect: (mongoose) => {

        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);

        const URI = 'mongodb+srv://Parjanya:Yannarascala_007@cluster0-ctbhr.mongodb.net/test?retryWrites=true&w=majority';

        mongoose.connect( URI, { useNewUrlParser: true }, err => {

            if(err)
                console.log(err);
            else
                console.log('Database Connected.');
        });
    },

    authKeyManagement: (cron) => {

        cron.schedule( '0 1 * * *', () => {

            const hat = require('hat');
            const userModel = require('./Models/userModel');

            userModel.find({}, (err, docs) => {

                for(let i = 0; i < docs.length; i++)
                    docs[i].authKey = hat();
            });
        });
    }
};
