const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const planningRoutes = require('./routes/planning');
const eventRoutes = require('./routes/event');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', planningRoutes);
app.use('/api', eventRoutes);

app.get('/', (req, res) => {
  res.send('API TwitchPlanner running');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});