const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./config/database'); 
const infoRoutes = require('./routes/infoRoutes');
const { validate } = require('./middlewares/validationMiddleware');
const { infoSchema } = require('./schemas/validationSchemas');
const userRoutes = require('./routes/userRoutes');
const InfoModel = require('./models/Information');

app.use(cors());
app.use(express.json());
// app.use(express.json({ limit: '50mb' }));


// app.get('/', (req, res) => {
//     res.send(`server is running on portt ${PORT}`);
//   });
  app.use('/api', userRoutes)


// app.use('/info', infoRoutes);
app.get('/', async (req, res) => {
  try {
    const users = await InfoModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
