const mongoose = require('mongoose');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(
'mongodb://raylie9:9045Yx2718281@ds125241.mlab.com:25241/pusherpoll_db')
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err));
/*
mongoose.connect('mongodb://raylie9:9045Yx2718281@ds125241.mlab.com:25241/pusherpoll_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo not'));
db.once('open', () => {
  console.log('DB connectig....');
});*/
