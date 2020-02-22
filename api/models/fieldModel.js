const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Field', fieldSchema);
