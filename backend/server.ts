// Entry point of the backend server
import express from 'express';
import cors from 'cors';
import {PrismaClient} from '@prisma/client'

const PORT = process.env.PORT || 3001;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes and middleware
app.get('/', async (req: express.Request, res: express.Response) => {
  try {
    res.json({ success: true });
  } catch (err: express.Error) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/users', async (req: express.Request, res: express.Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Error handling middleware
app.use((err: express.Error, req: express.Request, res: express.Response) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});


app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
});

export { app };
