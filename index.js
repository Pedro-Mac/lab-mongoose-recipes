const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'carne de porco a alentejana',
      level: 'Amateur Chef',
      ingredients: [
        'Carne de porco',
        'batata',
        'ameijoas',
        'coentros',
        'azeitona'
      ],
      cuisine: 'Portuguese',
      dishType: 'main_course',
      image:
        'https://lh3.googleusercontent.com/proxy/t6dhqa8_qLLle1xPt4flCCd_bXM8jq69P0KPogu-XI1qQECbvKUJ4ecij_13fSKqfERyyao9emZXLBBvukn9RJycIbk0g0DX6rE9XkOQs1smQWDOunhYiohODREiU4255LMnLhKazNsAwluB4oqq-_4',
      duration: 55,
      creator: 'Mrs. Alentejana',
      created: new Date(1974, 3, 25) // month 0 indexed
    });
  })
  .then(recipe => {
    console.log('This is what was returned', recipe);

    return Recipe.insertMany(data);
  })
  .then(data => {
    data.map(recipe => {
      console.log(recipe.title);
    });

    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log('Rigatoni alla Genovese: duration successfully updated');

    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully deleted the carrot cake from the DB');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('disconnected from the database');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
