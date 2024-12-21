const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, 'Please add a client name'],
        trim: true
    },
    feedback: {
        type: String,
        required: [true, 'Please add feedback content'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    clientImage: {
        type: String,
        default: 'default-avatar.jpg'
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
