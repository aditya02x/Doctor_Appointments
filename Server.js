import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import { connectDB } from './DB/db.js';
import authroute from './routes/auth.route.js';

import cors from "cors";



const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth',authroute)

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}
startServer();
 