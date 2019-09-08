const mongoose = require('mongoose');

const Store = mongoose.model('Store');
// Store is exported from Store.js

exports.homepage = (req, res) => {
  console.log(req.name)
  res.render('index')
}
exports.addStore = (req, res) => {
  res.render('editStore', {
    title: 'Add Store'
  })
}
exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  /** None of that will be reflected in the database until you call save() */
  req.flash('success', `Successfully added ${store.name} care to leave a review?`)
    /** Fires a connection to your mongodb, save that data and then come back to us with either the store itself or an error */
  res.redirect(`/store/${store.slug}`);
}

exports.getStore = async (req, res) => {
  const stores = await Store.find();
  console.log(stores)
  res.render('stores', {title: 'Stores', stores})
}

exports.editStore = async (req, res) => {
  const store = await Store.findOne({_id: req.params.id});
  res.render('editStore', {title: `Edit store ${store.name}`, store})
}

exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true, //returns a new store instead of the old one
    runValidators: true,
  }).exec() //exec() will run the query findOneAndUpdate(_id = query)
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">${store.name}</a></a>`)
  res.redirect(`/stores/${store._id}/edit`)
}