import express from 'express';
import { config } from './config/confCors.js';
import cors from 'cors';
import http from 'http';
import { router as commonRouter } from './routes/common.routes.js';
import { router as companyRouter } from './routes/company.routes.js';
import { router as coverageRouter } from './routes/coverage.routes.js';

const app = express();
const server = http.createServer(app); 

// Use Node.js body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors(config));
app.options(/.*/, cors());

//Routes
app.use('/api/v1/common', commonRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/coverages', coverageRouter);


const port = process.env.PORT || 3001;
// starting the server
server.listen(port, () => {
    console.log('Listening in http://localhost:' + port);
});

server.on('error', (error: NodeJS.ErrnoException) => {
    console.error('Error starting server:', error.message);
});

