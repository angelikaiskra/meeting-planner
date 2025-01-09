// Entry point of the backend server
import express from 'express';
import db from './db/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.json());

// Routes and middleware
app.get('/api', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT} 🚀`);
});