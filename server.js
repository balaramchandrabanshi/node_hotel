const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body


app.get('/', (req, res) => {
  res.send('Welcome to our Hotel')
})

// Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})


