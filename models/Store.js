const mongoose = require('mongoose');
mongoose.Promise = global.Promise; /* we essentially set the mongoose Promise property to be global which is sort of like, the Window in the browser.*/
const slug = require('slugs');

// Make or schema
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

storeSchema.pre('save', function(next){
  if(!this.isModified('name')) {
    next() //skip it
    return; // Stop this fnction from running
  }
  this.slug = slug(this.name);// This is sort of like, a middleware as well where you set the slug property and then you move along. 
  next(); //The save will not happen until we're done whatever work it is that we're trying to do inside
  // TODO: Make more resiliant so slugs are unique
});
module.exports = mongoose.model('Store', storeSchema);
