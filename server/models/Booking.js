const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    userEmail: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please add a valid email'
        ]
    },
    serviceRequested: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Please specify the service']
    },
    bookingDate: {
        type: Date,
        required: [true, 'Please add a booking date']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
