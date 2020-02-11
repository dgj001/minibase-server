const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  value: {
    type: String
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  createdAt: Date
});

module.exports = mongoose.model('Field', fieldSchema);
