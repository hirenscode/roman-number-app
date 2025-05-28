const dotenv = require('dotenv');
const cors = require('cors');

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';
dotenv.config({ path: envFile });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5002;

const romanNumeralRoutes = require('./routes/romanNumeralRoutes');

const frontendOrigin = 'http://localhost:5173';

const corsOptions = {
  origin: frontendOrigin,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('No API at this endpoint, please try hitting http://{host}:{port}/romannumeral?number={number}!');
});

app.use('/romannumeral', romanNumeralRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}, allowing requests from ${frontendOrigin}`);
});
