const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  },
  createdAt: Date
});

module.exports = mongoose.model('Document', documentSchema);
