const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://easy-tracking-db:Ammaxx@cluster0.f9zsb.mongodb.net/amsoft?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;