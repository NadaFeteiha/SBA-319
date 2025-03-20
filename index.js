import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Routes
import userRouter from './routes/user.routes.js';
import locationRouter from './routes/location.routes.js';

// to set the environment variables from the .env file
// the .env file should be in the root folder
// the .env file should be added to the .gitignore
dotenv.config();
console.log(process.env.MONGODB_URI)


// connect to the database MongoDB
await mongoose.connect(process.env.MONGODB_URI)
    .then(() => { console.log('Connected to the database'); })
    .catch((err) => { console.log('Error connecting to the database', err); })


// for deployment the port will be provided by the server
// the 4000 as default port for development
const PORT = process.env.PORT || 4000;

const app = express();

// view engine 
app.set('views', './views'); // where the views are located
app.set('view engine', 'pug');// the view engine type


// middleware 
// functions that executes for every request to the app
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet()); // => Security add all security headers to the response
app.use(cors()); // => Cross Origin Resource Sharing 

// routes
app.get('/', (req, res) => {
    res.render('index');
});

// API routes
app.use('/weather-api/user', userRouter);
app.use('/weather-api/location', locationRouter);


// Global error handling
// if there is _ before the var that means we are not using it
// same as _req that means we will not use the req
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
