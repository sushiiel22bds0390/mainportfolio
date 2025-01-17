const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/contactForm', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Contact = mongoose.model('Contact', contactSchema);
app.post('/api/contact', async (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  try {
    await newContact.save();
    res.status(200).send('Contact saved successfully');
  } catch (err) {
    res.status(500).send('Error saving to database');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
