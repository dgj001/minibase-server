const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  databaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Database',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Collection', collectionSchema);
