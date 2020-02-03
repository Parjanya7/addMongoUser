module.exports = (app) => {

    const userRouter = require('./routes/userRoute');

    app.use('/user', userRouter);
};