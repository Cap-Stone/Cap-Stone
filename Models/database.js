const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@databasebenchmark-ga1yr.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('Error connecting to MongoDB', error);
});

connection.once('open', () => {
  console.log('Connected to MongoDB');
});