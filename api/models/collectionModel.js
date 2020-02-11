const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  databaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Database',
    required: true
  },
  createdAt: Date
});

module.exports = mongoose.model('Collection', collectionSchema);
