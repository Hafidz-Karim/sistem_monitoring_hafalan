import express from "express";
import sistemHafalanRoutes from './routes/sistem-hafalan';

const app = express();

app.use(express.json());


const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server running in port 3000');
})