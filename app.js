const express = require('express');
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('db connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
})

//routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
    if( err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized" });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`Listening on port: ${port}`)});