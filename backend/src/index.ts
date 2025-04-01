import express from 'express';
import cors from 'cors'; 
import userRouter from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type'] 
}));

app.use(express.json())

app.use('/api/users', userRouter);

app.get('/health', (_, res) => {
  res.json({ status: 'API is running' });
});

app.use((_, res) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested resource was not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});