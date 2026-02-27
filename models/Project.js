const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  youtubeUrl: { // original URL
    type: String,
    required: true,
    trim: true
  },
  embedUrl: { // auto-generated embed URL
    type: String,
    required: true,
    trim: true
  },
  videoType: { 
    type: String, 
    enum: ['normal', 'shorts'],
    default: 'normal'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;
