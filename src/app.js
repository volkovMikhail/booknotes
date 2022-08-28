require('dotenv').config();
const express = require('express');
const app = express();
const { join } = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router');

app.set('view engine', 'ejs');
app.set('views', join(__dirname, '..', 'views'));

app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
