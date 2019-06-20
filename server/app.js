require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./configs/passport.config')
require('./configs/mongoose.config')
require('./configs/cloudinary.config')

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(session({
  secret: "sshhhhh",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// configuracion middleware CORS
const whitelist = ['http://localhost:3000',"https://u-voice.herokuapp.com"]
const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin);
    cb(null, originIsWhitelisted)
  }
}
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Ways';

const fileRoutes = require('./routes/file-upload.routes')
app.use('/api', fileRoutes);

const coasterRoutes = require('./routes/post.routes')
app.use('/api', coasterRoutes)

const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);
app.use((req, res) => {res.sendFile(__dirname + "/public/index.html")})
module.exports = app;
