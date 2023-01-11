const express = require('express');
const app = express();

const cors = require('cors');
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');

const router = require('./route')

// adding Helmet to enhance your Rest API's security
app.use(helmet());

app.use(bodyParser.json({ limit: '50mb' })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 })); // support encoded bodies
app.use(responseTime());

// adding support for cross-origin
app.use(cors());
app.options('*', cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.set('trust proxy', 1);
app.use(session({ secret: 'secretkey', cookie: { maxAge: 60000 } }));

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use('/api', router)


app.listen(3000, function () {
    console.log('Listening to Port 3000');
});

module.exports = app