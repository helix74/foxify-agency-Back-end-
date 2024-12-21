const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    body: {
        type: String,
        required: [true, 'Please add content body']
    },
    type: {
        type: String,
        enum: ['blog', 'page', 'announcement'],
        required: [true, 'Please specify content type']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    slug: {
        type: String,
        unique: true
    },
    featuredImage: {
        type: String
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

// Create slug from title before saving
contentSchema.pre('save', function(next) {
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

module.exports = mongoose.model('Content', contentSchema);
