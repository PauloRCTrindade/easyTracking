const path = require('path');

const nodemailer = require('nodemailer');

const hbs = require('nodemailer-express-handlebars');

const configEmail = require('../config/mail.json');


const transport = nodemailer.createTransport({
    host: configEmail.host,
    port: configEmail.port,
    auth: {
        user: configEmail.user,
        pass: configEmail.pass
    }

});

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));


module.exports = transport;